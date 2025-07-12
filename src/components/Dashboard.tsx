'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { FundingSource, Application } from '../types'
import { apiClient } from '../lib/api'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription } from './ui/alert'
import { 
  GraduationCap, 
  LogOut, 
  DollarSign, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  Plus
} from 'lucide-react'

export function Dashboard() {
  const { user, logout, isAdmin } = useAuth()
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fundingData, applicationData] = await Promise.all([
          apiClient.getFundingSources(),
          apiClient.getApplications()
        ])
        setFundingSources(fundingData)
        setApplications(applicationData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleApply = async (fundingSourceId: string, amount: number) => {
    try {
      const newApplication = await apiClient.createApplication(fundingSourceId, amount)
      setApplications(prev => [...prev, newApplication])
      setError('')
    } catch (err) {
      console.error('Application submission error:', err)
      if (err instanceof Error) {
        setError(err.message)
      } else if (typeof err === 'string') {
        setError(err)
      } else {
        setError('Failed to submit application. Please try again.')
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Financial Aid Portal</h1>
                <p className="text-sm text-gray-600">{user?.tenantRealm}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link href="/admin" className="px-4 py-2 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors">
                  Admin Panel
                </Link>
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="funding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="funding">Available Funding</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="funding" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Available Funding Sources</h2>
              <Badge variant="secondary" className="text-sm">
                {fundingSources.length} opportunities
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fundingSources.map((source) => (
                <Card key={source.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{source.name}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">
                        ${source.amount.toLocaleString()}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {source.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Eligibility Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {source.eligibility_criteria.map((criteria, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                            {criteria}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Deadline: {source.deadline}
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleApply(source.id, source.amount)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
              <Badge variant="secondary" className="text-sm">
                {applications.length} applications
              </Badge>
            </div>

            {applications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                  <p className="text-gray-600 mb-4">
                    You haven&apos;t submitted any applications. Browse available funding sources to get started.
                  </p>
                  <Button onClick={() => {
                    const fundingTab = document.querySelector('[value="funding"]') as HTMLElement
                    fundingTab?.click()
                  }}>
                    Browse Funding Sources
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => {
                  const fundingSource = fundingSources.find(fs => fs.id === application.funding_source_id)
                  return (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {fundingSource?.name || 'Unknown Funding Source'}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Application ID: {application.id}
                            </p>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            <div className="flex items-center">
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">{application.status}</span>
                            </div>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">Amount:</span>
                            <span className="ml-1 font-medium">
                              ${application.amount_requested.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">Submitted:</span>
                            <span className="ml-1 font-medium">
                              {new Date(application.submitted_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-600">Documents:</span>
                            <span className="ml-1 font-medium">
                              {application.documents.length} files
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
