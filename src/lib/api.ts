import { LoginRequest, LoginResponse, FundingSource, Application, User } from '../types'

class ApiClient {
  private token: string | null = null

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port
    const cleanOrigin = `${protocol}//${hostname}${port ? ':' + port : ''}`
    const url = new URL(endpoint, cleanOrigin).toString()
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'An error occurred' }))
      throw new Error(errorData.detail || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    
    this.setToken(response.access_token)
    return response
  }

  async getUserProfile(): Promise<User> {
    return this.request<User>('/api/user/profile')
  }

  async getFundingSources(): Promise<FundingSource[]> {
    return this.request<FundingSource[]>('/api/funding-sources')
  }

  async getApplications(): Promise<Application[]> {
    return this.request<Application[]>('/api/applications')
  }

  async createApplication(fundingSourceId: string, amountRequested: number): Promise<Application> {
    return this.request<Application>('/api/applications', {
      method: 'POST',
      body: JSON.stringify({
        funding_source_id: fundingSourceId,
        amount_requested: amountRequested,
      }),
    })
  }

  async getAdminDashboard(): Promise<any> {
    return this.request<any>('/api/admin/dashboard')
  }

  async getStudents(): Promise<any[]> {
    return this.request<any[]>('/api/admin/students')
  }

  async getFundingRequests(): Promise<any[]> {
    return this.request<any[]>('/api/admin/funding-requests')
  }

  async getMatchingResults(): Promise<any> {
    return this.request<any>('/api/admin/matching')
  }

  async getWorkflowItems(): Promise<any[]> {
    return this.request<any[]>('/api/admin/workflow')
  }

  async getAutomationAgents(): Promise<any[]> {
    return this.request<any[]>('/api/admin/automation')
  }

  async getAdminFundingSources(): Promise<any[]> {
    return this.request<any[]>('/api/admin/funding-sources')
  }

  async createFundingSource(data: any): Promise<any> {
    return this.request<any>('/api/admin/funding-sources', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateWorkflowItem(id: number, data: any): Promise<any> {
    return this.request<any>(`/api/admin/workflow/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  logout() {
    this.token = null
  }
}

export const apiClient = new ApiClient()
