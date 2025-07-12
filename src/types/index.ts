export interface User {
  id: string
  username: string
  tenantRealm: string
  role: string
}

export interface AdminDashboardStats {
  totalApplications: number
  availableFunding: number
  studentsServed: number
  fundingSources: number
}

export interface WorkflowStats {
  submitted: number
  review: number
  approved: number
  rejected: number
  funded: number
}

export interface StudentRecord {
  id: number
  name: string
  studentId: string
  email: string
  major: string
  year: string
  gpa: string
  credits: number
  demographics: {
    gender: string
    ethnicity: string
    firstGen: boolean
    veteran: boolean
    athlete: boolean
  }
  financial: {
    efc: string
    income: string
    inState: boolean
  }
  applications: number
  totalRequested: string
  totalReceived: string
  status: string
}

export interface FundingRequestRecord {
  id: number
  student: string
  studentId: string
  amount: string
  type: string
  status: string
  priority: string
  submitted: string
  gpa: string
  major: string
  year: string
  demographics: string
}

export interface MatchingResult {
  id: number
  student: string
  studentId: string
  requestAmount: string
  matchedSources: Array<{
    name: string
    amount: string
  }>
  totalMatched: string
  matchScore: number
  confidence: string
  status: string
}

export interface WorkflowItem {
  id: number
  student: string
  studentId: string
  application: string
  amount: string
  currentStage: string
  nextStage: string | null
  assignedTo: string
  lastActivity: string
  timeline: Array<{
    stage: string
    date: string | null
    completed: boolean
    inProgress?: boolean
  }>
  notes: string
  priority: string
}

export interface AutomationAgent {
  id: number
  name: string
  type: string
  description: string
  status: string
  trigger: string
  frequency: string
  conditions: Record<string, any>
  actions: string[]
  lastRun: string
  nextRun: string
  successRate: number
  totalExecutions: number
  createdBy: string
  createdDate: string
}

export interface LoginRequest {
  tenantRealm: string
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: User
}

export interface FundingSource {
  id: string
  name: string
  description: string
  amount: number
  eligibility_criteria: string[]
  deadline: string
  status: string
}

export interface Application {
  id: string
  student_id: string
  funding_source_id: string
  amount_requested: number
  status: string
  submitted_at: string
  documents: string[]
}

export interface ApiError {
  detail: string
}
