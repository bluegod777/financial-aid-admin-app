import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const requests = [
      {
        id: 1,
        student: 'Sarah Johnson',
        studentId: 'SJ2024001',
        amount: '$3,500',
        type: 'Need-Based',
        status: 'Under Review',
        priority: 'High',
        submitted: '2024-03-15',
        gpa: '3.8',
        major: 'Computer Science',
        year: 'Junior',
        demographics: 'Female, First-generation'
      },
      {
        id: 2,
        student: 'Michael Chen',
        studentId: 'MC2024002',
        amount: '$2,200',
        type: 'Merit-Based',
        status: 'Approved',
        priority: 'Medium',
        submitted: '2024-03-10',
        gpa: '3.9',
        major: 'Engineering',
        year: 'Senior',
        demographics: 'Asian American'
      }
    ];

    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch funding requests data' }, { status: 500 });
  }
}
