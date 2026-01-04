import {
  FileText,
  FolderKanban,
  Users,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

function StatCard({ title, value, icon, trend, trendUp, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--color-muted-foreground)]">{title}</p>
          <p className="mt-1 text-2xl font-bold text-[var(--color-foreground)]">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface RecentActivityProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  iconBg: string;
}

function RecentActivity({ icon, title, description, time, iconBg }: RecentActivityProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-[var(--color-muted)] transition-colors">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-foreground)] truncate">{title}</p>
        <p className="text-xs text-[var(--color-muted-foreground)] truncate">{description}</p>
      </div>
      <span className="text-xs text-[var(--color-muted-foreground)] whitespace-nowrap">{time}</span>
    </div>
  );
}

export function DashboardView() {
  const { state } = useDashboard();

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white shadow-lg">
          <h1 className="text-xl font-bold">Welcome back!</h1>
          <p className="mt-1 text-violet-100">
            Here's an overview of your VForms activity. You have {state.projects.length} active project{state.projects.length !== 1 ? 's' : ''}.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Projects"
            value={state.projects.length}
            icon={<FolderKanban className="h-5 w-5 text-violet-600" />}
            trend="+2 this month"
            trendUp={true}
            color="bg-violet-100"
          />
          <StatCard
            title="Forms Completed"
            value={12}
            icon={<FileText className="h-5 w-5 text-blue-600" />}
            trend="+5 this week"
            trendUp={true}
            color="bg-blue-100"
          />
          <StatCard
            title="Team Members"
            value={8}
            icon={<Users className="h-5 w-5 text-emerald-600" />}
            color="bg-emerald-100"
          />
          <StatCard
            title="Uploaded Documents"
            value={state.uploadedAssets.length}
            icon={<Building2 className="h-5 w-5 text-amber-600" />}
            color="bg-amber-100"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                <h3 className="font-semibold text-[var(--color-foreground)]">Recent Activity</h3>
              </div>
              <button className="text-xs font-medium text-[var(--color-primary)] hover:underline">
                View all
              </button>
            </div>
            <div className="p-2">
              <RecentActivity
                icon={<FileText className="h-4 w-4 text-violet-600" />}
                title="SF330 Updated"
                description="Contract-specific qualifications form"
                time="2 min ago"
                iconBg="bg-violet-100"
              />
              <RecentActivity
                icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                title="Project Completed"
                description="Federal Reserve Bank Modernization"
                time="1 hour ago"
                iconBg="bg-emerald-100"
              />
              <RecentActivity
                icon={<Users className="h-4 w-4 text-blue-600" />}
                title="Team Member Added"
                description="Dr. Sarah Mitchell joined"
                time="3 hours ago"
                iconBg="bg-blue-100"
              />
              <RecentActivity
                icon={<AlertCircle className="h-4 w-4 text-amber-600" />}
                title="Form Due Soon"
                description="SF254 submission deadline in 3 days"
                time="Yesterday"
                iconBg="bg-amber-100"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                <h3 className="font-semibold text-[var(--color-foreground)]">Quick Actions</h3>
              </div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center rounded-lg border border-[var(--color-border)] p-4 hover:bg-[var(--color-muted)] hover:border-[var(--color-primary)] transition-colors">
                <FileText className="h-6 w-6 text-violet-600" />
                <span className="mt-2 text-sm font-medium text-[var(--color-foreground)]">New SF330</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border border-[var(--color-border)] p-4 hover:bg-[var(--color-muted)] hover:border-[var(--color-primary)] transition-colors">
                <FolderKanban className="h-6 w-6 text-blue-600" />
                <span className="mt-2 text-sm font-medium text-[var(--color-foreground)]">New Project</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border border-[var(--color-border)] p-4 hover:bg-[var(--color-muted)] hover:border-[var(--color-primary)] transition-colors">
                <Users className="h-6 w-6 text-emerald-600" />
                <span className="mt-2 text-sm font-medium text-[var(--color-foreground)]">Add Member</span>
              </button>
              <button className="flex flex-col items-center justify-center rounded-lg border border-[var(--color-border)] p-4 hover:bg-[var(--color-muted)] hover:border-[var(--color-primary)] transition-colors">
                <Building2 className="h-6 w-6 text-amber-600" />
                <span className="mt-2 text-sm font-medium text-[var(--color-foreground)]">Upload Docs</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

