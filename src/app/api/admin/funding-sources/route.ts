import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const fundingSources = [
      {
        id: 1,
        name: 'Federal Pell Grant',
        description: 'Need-based grant for undergraduate students with exceptional financial need',
        type: 'Federal',
        amount: '$7,395',
        available: '$2,500,000',
        deadline: '2024-06-30',
        status: 'Active',
        eligibility: ['Undergraduate', 'Financial Need', 'US Citizen'],
        applications: 1247,
        awarded: 892
      },
      {
        id: 2,
        name: 'State Merit Scholarship',
        description: 'Merit-based scholarship for high-achieving students',
        type: 'State',
        amount: '$5,000',
        available: '$1,200,000',
        deadline: '2024-05-15',
        status: 'Active',
        eligibility: ['GPA 3.5+', 'State Resident', 'Full-time'],
        applications: 567,
        awarded: 234
      },
      {
        id: 3,
        name: 'STEM Excellence Fund',
        description: 'Support for students pursuing Science, Technology, Engineering, and Mathematics',
        type: 'Foundation',
        amount: '$3,500',
        available: '$800,000',
        deadline: '2024-04-30',
        status: 'Active',
        eligibility: ['STEM Major', 'GPA 3.0+', 'Junior/Senior'],
        applications: 234,
        awarded: 156
      },
      {
        id: 4,
        name: 'First Generation College Grant',
        description: 'Financial assistance for first-generation college students',
        type: 'Institutional',
        amount: '$2,500',
        available: '$600,000',
        deadline: '2024-07-15',
        status: 'Active',
        eligibility: ['First Generation', 'Financial Need', 'Good Standing'],
        applications: 445,
        awarded: 298
      },
      {
        id: 5,
        name: 'Veterans Education Benefit',
        description: 'Educational support for military veterans and their families',
        type: 'Federal',
        amount: '$4,200',
        available: '$950,000',
        deadline: '2024-08-31',
        status: 'Active',
        eligibility: ['Veteran Status', 'Honorable Discharge', 'Enrolled'],
        applications: 123,
        awarded: 89
      }
    ];

    return NextResponse.json(fundingSources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch funding sources data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const newFundingSource = {
      id: Date.now(),
      ...body,
      status: 'Active',
      applications: 0,
      awarded: 0
    };

    return NextResponse.json(newFundingSource, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create funding source' }, { status: 500 });
  }
}
