import { Navigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, loading] = useAuthState(auth);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    // Redirect to login if not authenticated or not admin
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
} 