<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\LeadDistributionService;
use Illuminate\Http\Response;

class LeadDistributionController extends Controller
{
    protected $distributionService;

    public function __construct(LeadDistributionService $distributionService)
    {
        $this->distributionService = $distributionService;
    }

    public function distribute()
    {
        try {
            $this->distributionService->distribute();
            return response()->json([
                'message' => 'Leads distributed successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to distribute leads',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
} 