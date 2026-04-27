'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit more'),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full border-b border-border bg-transparent py-3 text-charcoal placeholder-mid-gray/50 focus:outline-none focus:border-charcoal transition-colors duration-300'

const labelClass = 'block text-xs uppercase tracking-widest text-mid-gray mb-3'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-20">
        <p className="font-display text-4xl italic font-light mb-4">Thank you.</p>
        <p className="text-mid-gray text-sm">We'll be in touch within 48 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass}>Full Name</label>
          <input {...register('name')} className={inputClass} placeholder="Your name" />
          {errors.name && <p className="text-xs text-warm-stone mt-2">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input {...register('email')} type="email" className={inputClass} placeholder="your@email.com" />
          {errors.email && <p className="text-xs text-warm-stone mt-2">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass}>Project Type</label>
          <select {...register('projectType')} className={inputClass}>
            <option value="">Select...</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="hospitality">Hospitality</option>
            <option value="other">Other</option>
          </select>
          {errors.projectType && <p className="text-xs text-warm-stone mt-2">{errors.projectType.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Budget Range (Optional)</label>
          <select {...register('budget')} className={inputClass}>
            <option value="">Prefer not to say</option>
            <option value="under-50k">Under $50K</option>
            <option value="50k-150k">$50K – $150K</option>
            <option value="150k-500k">$150K – $500K</option>
            <option value="500k+">$500K+</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Tell Us About Your Project</label>
        <textarea
          {...register('message')}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Describe your vision, space, and aspirations..."
        />
        {errors.message && <p className="text-xs text-warm-stone mt-2">{errors.message.message}</p>}
      </div>

      <div className="flex items-center justify-between pt-2">
        {status === 'error' && (
          <p className="text-sm text-warm-stone">Something went wrong. Please try again.</p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="ml-auto bg-charcoal text-off-white px-10 py-4 text-xs uppercase tracking-widest hover:bg-warm-stone transition-colors duration-500 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
        </button>
      </div>
    </form>
  )
}
