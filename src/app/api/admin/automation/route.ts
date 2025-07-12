import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const automationAgents = [
      {
        id: 1,
        name: 'Student Deadline Reminders',
        type: 'reminder',
        description: 'Automatically sends reminder emails to students about upcoming application deadlines',
        status: 'active',
        trigger: 'schedule',
        frequency: 'daily',
        conditions: {
          daysBeforeDeadline: 7,
          targetAudience: 'students_with_pending_applications',
          excludeCompleted: true
        },
        actions: [
          'send_email_reminder',
          'update_student_portal_notification',
          'log_communication'
        ],
        lastRun: '2024-03-21 08:00 AM',
        nextRun: '2024-03-22 08:00 AM',
        successRate: 98.5,
        totalExecutions: 156,
        createdBy: 'Dr. Smith',
        createdDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Low Funding Alerts',
        type: 'alert',
        description: 'Monitors funding sources and alerts administrators when available funds drop below threshold',
        status: 'active',
        trigger: 'event',
        frequency: 'real-time',
        conditions: {
          thresholdPercentage: 20,
          fundingTypes: ['federal', 'state', 'institutional'],
          alertLevel: 'warning'
        },
        actions: [
          'send_admin_alert',
          'create_dashboard_notification',
          'generate_funding_report'
        ],
        lastRun: '2024-03-20 02:15 PM',
        nextRun: 'Event-driven',
        successRate: 100,
        totalExecutions: 23,
        createdBy: 'Ms. Johnson',
        createdDate: '2024-01-20'
      }
    ];

    return NextResponse.json(automationAgents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch automation data' }, { status: 500 });
  }
}
