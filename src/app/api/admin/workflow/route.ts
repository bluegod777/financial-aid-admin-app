import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const workflowItems = [
      {
        id: 1,
        student: 'Sarah Johnson',
        studentId: 'SJ2024001',
        application: 'Need-Based Aid',
        amount: '$3,500',
        currentStage: 'review',
        nextStage: 'approved',
        assignedTo: 'Dr. Smith',
        lastActivity: '2 hours ago',
        timeline: [
          { stage: 'submitted', date: '2024-03-15', completed: true },
          { stage: 'review', date: '2024-03-16', completed: false, inProgress: true },
          { stage: 'approved', date: null, completed: false },
          { stage: 'funded', date: null, completed: false }
        ],
        notes: 'Requires additional documentation for verification',
        priority: 'High'
      },
      {
        id: 2,
        student: 'Michael Chen',
        studentId: 'MC2024002',
        application: 'Merit Scholarship',
        amount: '$2,200',
        currentStage: 'approved',
        nextStage: 'funded',
        assignedTo: 'Ms. Johnson',
        lastActivity: '1 day ago',
        timeline: [
          { stage: 'submitted', date: '2024-03-10', completed: true },
          { stage: 'review', date: '2024-03-12', completed: true },
          { stage: 'approved', date: '2024-03-18', completed: true },
          { stage: 'funded', date: null, completed: false }
        ],
        notes: 'Approved pending final budget allocation',
        priority: 'Medium'
      }
    ];

    return NextResponse.json(workflowItems);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workflow data' }, { status: 500 });
  }
}
