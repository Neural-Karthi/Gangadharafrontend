
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"], 
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
				'2xl': '1536px',
			}
		},
		extend: {
			colors: {
        // Removed old theme-specific colors:
        // 'gold-primary': '#FFD700',
        // 'gold-secondary': '#D4AF37', 
        // 'emerald-green': '#28A745',
        // 'soft-gray': '#F5F5F5', 
        // 'charcoal': '#333333', 

				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', 
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-glow': { // Will use primary color for glow
          '0%, 100%': { boxShadow: '0 0 0 0px hsl(var(--primary) / 0.7)', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 10px 10px hsl(var(--primary) / 0)', transform: 'scale(1.05)' },
        },
        'typewriter': {
          from: { width: '0' },
          to: { width: '100%' }
        },
        'caret-blink': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' } 
        },
				'logo-reveal': {
					'0%': { opacity: '0', transform: 'scale(0.5)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'marquee': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        'fall-in': {
          '0%': { opacity: '0', transform: 'translateY(-60px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulse-glow 2s infinite',
        'typewriter': 'typewriter 3.5s steps(40, end) 1s 1 normal both',
        'caret-blink': 'caret-blink .75s step-end infinite',
				'logo-reveal': 'logo-reveal 1s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 1.5s ease-in-out infinite',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'marquee': 'marquee 60s linear infinite',
        'fall-in': 'fall-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
