import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const students = [
      {
        id: 1,
        name: 'Sarah Johnson',
        studentId: 'SJ2024001',
        email: 'sarah.johnson@university.edu',
        major: 'Computer Science',
        year: 'Junior',
        gpa: '3.8',
        credits: 89,
        demographics: {
          gender: 'Female',
          ethnicity: 'Caucasian',
          firstGen: true,
          veteran: false,
          athlete: false
        },
        financial: {
          efc: '$2,500',
          income: '$35,000',
          inState: true
        },
        applications: 3,
        totalRequested: '$8,500',
        totalReceived: '$5,200',
        status: 'Active'
      },
      {
        id: 2,
        name: 'Michael Chen',
        studentId: 'MC2024002',
        email: 'michael.chen@university.edu',
        major: 'Engineering',
        year: 'Senior',
        gpa: '3.9',
        credits: 118,
        demographics: {
          gender: 'Male',
          ethnicity: 'Asian American',
          firstGen: false,
          veteran: false,
          athlete: false
        },
        financial: {
          efc: '$8,000',
          income: '$65,000',
          inState: true
        },
        applications: 2,
        totalRequested: '$4,200',
        totalReceived: '$2,200',
        status: 'Active'
      }
    ];

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students data' }, { status: 500 });
  }
}
