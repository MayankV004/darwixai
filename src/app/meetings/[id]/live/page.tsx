import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { mockMeetings, mockCustomers } from '@/lib/mock-data'
import LiveMeetingClient from './LiveMeetingClient'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const meeting = mockMeetings[resolvedParams.id]
  const customer = meeting ? mockCustomers[meeting.customerIds[0]] : null;
  const title = customer ? `Live Meeting: ${customer.name} | Darwix AI` : 'Live Meeting | Darwix AI';

  return {
    title,
    description: 'AI-assisted live loan application review meeting. Real-time compliance monitoring and automated customer profile capture.',
  }
}

export default async function LiveMeeting({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const meeting = mockMeetings[resolvedParams.id]
  if (!meeting) return notFound()

  const customer = mockCustomers[meeting.customerIds[0]]

  return <LiveMeetingClient meetingId={meeting.id} initialCustomer={customer} />
}
