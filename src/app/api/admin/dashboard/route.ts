import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const dashboardData = {
      stats: {
        totalApplications: 2847,
        availableFunding: 8200000,
        studentsServed: 1923,
        fundingSources: 247
      },
      workflowStats: {
        submitted: 892,
        review: 456,
        approved: 789,
        rejected: 123,
        funded: 587
      },
      recentActivity: [
        { action: 'New application submitted', student: 'Sarah Johnson', time: '2 minutes ago', status: 'submitted' },
        { action: 'Funding approved', student: 'Michael Chen', time: '15 minutes ago', status: 'approved' },
        { action: 'Review completed', student: 'Emma Rodriguez', time: '1 hour ago', status: 'reviewed' },
        { action: 'Document uploaded', student: 'David Kim', time: '2 hours ago', status: 'submitted' },
        { action: 'Funding disbursed', student: 'Ashley Brown', time: '3 hours ago', status: 'funded' },
      ]
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
