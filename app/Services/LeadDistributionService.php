<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LeadDistributionService
{
    public function distribute()
    {
        DB::transaction(function () {
            // Remove expired leads (older than 20 days)
            Lead::where('created_at', '<', Carbon::now()->subDays(20))
                ->delete();

            // Get active companies
            $companies = Company::where('is_active', true)
                ->orderBy('id')
                ->get();

            if ($companies->isEmpty()) {
                return;
            }

            // Get today's undistributed leads
            $dailyLeads = Lead::whereNull('company_id')
                ->where('created_at', '>=', Carbon::today())
                ->get();

            // Calculate base distribution
            $leadsCount = $dailyLeads->count();
            $baseLeadsPerCompany = floor($leadsCount / $companies->count());
            $remainder = $leadsCount % $companies->count();

            // Distribute leads
            $currentLeadIndex = 0;

            foreach ($companies as $index => $company) {
                // Calculate leads for this company
                $companyLeadCount = $baseLeadsPerCompany;
                if ($index < $remainder) {
                    $companyLeadCount++;
                }

                // Assign leads to company
                for ($i = 0; $i < $companyLeadCount; $i++) {
                    if (isset($dailyLeads[$currentLeadIndex])) {
                        $dailyLeads[$currentLeadIndex]->update([
                            'company_id' => $company->id
                        ]);
                        $currentLeadIndex++;
                    }
                }
            }

            // Rotate previous day's leads
            $this->rotatePreviousDayLeads($companies);
        });
    }

    private function rotatePreviousDayLeads($companies)
    {
        // Get yesterday's leads
        $yesterdayLeads = Lead::where('created_at', '>=', Carbon::yesterday())
            ->where('created_at', '<', Carbon::today())
            ->get()
            ->groupBy('company_id');

        if ($yesterdayLeads->isEmpty()) {
            return;
        }

        // Create rotation mapping
        $companyCount = $companies->count();
        foreach ($companies as $index => $company) {
            $nextCompanyIndex = ($index + 1) % $companyCount;
            $nextCompany = $companies[$nextCompanyIndex];

            // Get current company's leads and assign them to next company
            if (isset($yesterdayLeads[$company->id])) {
                foreach ($yesterdayLeads[$company->id] as $lead) {
                    $lead->update(['company_id' => $nextCompany->id]);
                }
            }
        }
    }
} 