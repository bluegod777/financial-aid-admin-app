import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
  }

  try {
    const matchingResults = [
      {
        id: 1,
        student: 'Sarah Johnson',
        studentId: 'SJ2024001',
        requestAmount: '$3,500',
        matchedSources: [
          { name: 'Federal Pell Grant', amount: '$2,500' },
          { name: 'Women in STEM Scholarship', amount: '$1,000' }
        ],
        totalMatched: '$3,500',
        matchScore: 95,
        confidence: 'High',
        status: 'Perfect Match'
      },
      {
        id: 2,
        student: 'Michael Chen',
        studentId: 'MC2024002',
        requestAmount: '$2,200',
        matchedSources: [
          { name: 'State Need-Based Grant', amount: '$1,500' },
          { name: 'Academic Excellence Fund', amount: '$500' }
        ],
        totalMatched: '$2,000',
        matchScore: 78,
        confidence: 'Medium',
        status: 'Partial Match'
      }
    ];

    const stats = {
      totalProcessed: 2847,
      perfectMatches: 1156,
      partialMatches: 892,
      noMatches: 456,
      totalFunding: '$8,250,000',
      matchedFunding: '$6,780,000',
      efficiency: 82.2
    };

    return NextResponse.json({ results: matchingResults, stats });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch matching data' }, { status: 500 });
  }
}
