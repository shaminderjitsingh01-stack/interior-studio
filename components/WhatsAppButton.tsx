'use client'
import { useState } from 'react'

const WHATSAPP_NUMBER = '6590000000' // replace with real number
const WHATSAPP_MESSAGE = 'Hi Zelf Collective, I'd like to enquire about your interior design services.'

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 overflow-hidden shadow-lg"
      style={{
        background: '#1C1C1C',
        borderRadius: 100,
        padding: hovered ? '14px 20px 14px 16px' : '14px',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        maxWidth: hovered ? '220px' : '52px',
      }}
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="16" cy="16" r="16" fill="#25D366" />
        <path
          fill="#fff"
          d="M23.5 8.5A10.44 10.44 0 0 0 16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.86.49 3.67 1.42 5.27L5.5 26.5l5.36-1.41A10.44 10.44 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5S21.8 5.5 16 5.5zm0 18.18a8.67 8.67 0 0 1-4.43-1.22l-.32-.19-3.18.84.85-3.1-.21-.33A8.68 8.68 0 1 1 16 24.68zm4.77-6.49c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.66.85-.81 1.02-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.09-1.3-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.16.17-.27.26-.45.09-.18.04-.34-.02-.47-.06-.13-.58-1.41-.8-1.93-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.81 2.77 4.39 3.88.61.27 1.09.42 1.46.54.61.19 1.17.17 1.61.1.49-.07 1.51-.62 1.73-1.21.21-.6.21-1.11.15-1.21-.07-.1-.24-.16-.5-.29z"
        />
      </svg>

      {/* Label — slides in on hover */}
      <span
        style={{
          color: '#FAFAF8',
          fontSize: '13px',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease 0.1s',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
        }}
      >
        Chat with us
      </span>
    </a>
  )
}
