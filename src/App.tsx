import { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows, Text, Html } from '@react-three/drei'
import { Layers, Download, Github, Linkedin, Mail } from 'lucide-react'
import Model from './components/Model'
import profileImg from './assets/cv-image.png'
import ProjectsSection from './components/ProjectsEye'
import SkillsSection from './components/SkillsNetwork'
import CertificationsSection from './components/CertificationsSection'
import EducationTimeline from './components/EducationTimeline'
import ContactSection from './components/ContactSection'
import MaskText from './components/animata/text/mask-text'
import { Terminal, AnimatedSpan, TypingAnimation } from './components/ui/terminal'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

// Configuration for planets/sections
const SECTIONS = [
  { id: 'projects', label: 'Projects', angle: 0, distance: 4.5, color: '#ff4c60', description: 'View my latest work and case studies.' },
  { id: 'skills', label: 'Skills', angle: Math.PI / 3, distance: 4.5, color: '#00E5FF', description: 'Explore my neural network of technical proficiencies.' },
  { id: 'about', label: 'About', angle: 2 * Math.PI / 3, distance: 4.5, color: '#6c6ce5', description: 'Learn about my background and creative philosophy.' },
  { id: 'certifications', label: 'Certifications', angle: Math.PI, distance: 4.5, color: '#7B61FF', description: 'Verified credentials and professional achievements.' },
  { id: 'education', label: 'Education', angle: 4 * Math.PI / 3, distance: 4.5, color: '#ffba08', description: 'My academic journey and educational background.' },
  { id: 'contact', label: 'Contact', angle: 5 * Math.PI / 3, distance: 4.5, color: '#44d7b6', description: 'Get in touch for collaborations or inquiries.' },
]

function Planet({ data, activeSection, setActiveSection }: any) {
  const [hovered, setHover] = useState(false)
  const isActive = activeSection === data.id

  // Calculate position based on angle and distance around the center
  const x = Math.cos(data.angle) * data.distance
  const z = Math.sin(data.angle) * data.distance
  const position = [x, 0, z]

  // Spring animation for hover/active states
  const { scale, color } = useSpring({
    scale: isActive || hovered ? 1.4 : 1,
    color: isActive || hovered ? data.color : '#8888aa',
    config: { mass: 1, tension: 280, friction: 60 }
  })

  // Floating animation for planets
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime + data.angle) * 0.3
    if (!isActive && !hovered) {
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <animated.group
      ref={ref}
      position={position as [number, number, number]}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation()
        setActiveSection(isActive ? null : data.id)
        if (!isActive && data.id) {
          setTimeout(() => {
            const el = document.getElementById(data.id)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHover(false)
        document.body.style.cursor = 'auto'
      }}
    >
      {/* The Planet Sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <animated.meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isActive ? 0.5 : 0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.72, 32]} />
        <meshBasicMaterial color={data.color} transparent opacity={hovered || isActive ? 0.8 : 0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* 3D Text Label Above Planet */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor={data.color}
      >
        {data.label}
      </Text>

      {/* HTML Description when active */}
      {isActive && (
        <Html position={[0, -1.2, 0]} center>
          <div className="planet-info-card">
            <h3>{data.label}</h3>
            <p>{data.description}</p>
            <button className="btn-primary small">Explore</button>
          </div>
        </Html>
      )}
    </animated.group>
  )
}

function FloatingOrbitingSystem({ activeSection, setActiveSection }: any) {
  const groupRef = useRef<THREE.Group>(null)

  // Slowly rotate the entire system if no section is active
  useFrame((state) => {
    if (groupRef.current && !activeSection) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Central orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.45, 4.5, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Render Planets */}
      {SECTIONS.map((section) => (
        <Planet
          key={section.id}
          data={section}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      ))}
    </group>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <div className="app-container screensaver-mode">
      {/* Minimal Header overlay */}
      <header className="header floating-header">
        <div className="logo-container">
          <Layers className="logo-icon" />
          <span className="logo-text">Abinav GT</span>
        </div>
      </header>




      {/* Hero Section with 3D Canvas */}
      <section className="hero-section">
        <div className="canvas-wrapper-full">
          <Canvas
            camera={{ position: [0, 4, 14], fov: 45 }}
            onPointerMissed={() => setActiveSection(null)}
          >
            <color attach="background" args={['#0a0a0f']} />
            <fog attach="fog" args={['#0a0a0f', 10, 30]} />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <spotLight position={[-10, 10, -10]} angle={0.2} penumbra={1} intensity={1} color="#00d2ff" />

            <Suspense fallback={<Html center><div className="loader">Loading Universe...</div></Html>}>
              {/* The Central Space Boi Model */}
              <Model scale={2.8} position={[0, -1.5, 0]} />

              {/* Interactive Planets Orbiting */}
              <FloatingOrbitingSystem activeSection={activeSection} setActiveSection={setActiveSection} />

              <Environment preset="city" />
              <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={30} blur={2.5} far={4} color="#000000" resolution={512} frames={1} />
            </Suspense>

            <OrbitControls
              enableZoom={true}
              minDistance={5}
              maxDistance={25}
              autoRotate={!activeSection}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text-column">
            <div className="section-line"></div>

            {/* Animated Terminal Intro */}
            <Terminal>
              <TypingAnimation>npx initialize-research @Abinav</TypingAnimation>
              <AnimatedSpan>✔ Ingesting raw datasets...</AnimatedSpan>
              <AnimatedSpan>✔ Optimizing hyperparameter space.</AnimatedSpan>
              <AnimatedSpan>✔ Validating model inference accuracy.</AnimatedSpan>
              <AnimatedSpan>✔ Deploying predictive pipeline.</AnimatedSpan>
              <TypingAnimation infinite={true} className="text-white mt-4 font-bold">Success! Insights generated by Abinav GT.</TypingAnimation>
            </Terminal>

            <div className="about-description-wrapper" style={{ minHeight: '180px', marginBottom: '3rem' }}>
              <MaskText
                className="about-mask-container"
                revealText={
                  <p className="about-description" style={{ margin: 0, color: '#fff' }}>
                    Hi, I'm <strong style={{ color: '#fff' }}>Abinav GT</strong> — a Data Scientist & ML Engineer driven by the art of turning complex data into actionable intelligence. I enjoy blending statistical rigor with scalable engineering to build models that don't just achieve high accuracy, but solve real-world problems. Always iterating, always discovering.
                  </p>
                }
                originalText={
                  <p className="about-description" style={{ margin: 0 }}>
                    Hi, I'm <strong className="text-white">Abinav GT</strong> — a Data Scientist & ML Engineer driven by the art of turning complex data into actionable intelligence. I enjoy blending statistical rigor with scalable engineering to build models that don't just achieve high accuracy, but solve real-world problems. Always iterating, always discovering.
                  </p>
                }
              />
            </div>
            <div className="about-actions">
              <a href="https://drive.google.com/file/d/1PO7_4GAEVNXRM0azl9O8TYyjNncF5OQ_/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn-resume" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Resume
              </a>
            </div>
          </div>
          <div className="about-image-column" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-4rem' }}>
            <img 
              src={profileImg} 
              alt="Abinav GT Profile" 
              style={{
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid rgba(0, 229, 255, 0.3)',
                boxShadow: '0 0 40px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 229, 255, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)';
              }}
            />
            {/* Professional Titles Badge */}
            <div style={{
              marginTop: '2rem',
              padding: '12px 28px',
              background: 'rgba(5, 8, 20, 0.6)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              borderRadius: '30px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span style={{ color: '#E0E6FF', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '1px' }}>ML Engineer</span>
              <span style={{ color: '#00E5FF', fontSize: '1.2rem' }}>•</span>
              <span style={{ color: '#E0E6FF', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '1px' }}>Data Analyst</span>
            </div>
            
            {/* Statistics Row */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.2rem'
            }}>
              <div style={{
                padding: '8px 16px',
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ color: '#00E5FF', fontSize: '1.2rem', fontWeight: 700 }}>15+</div>
                <div style={{ color: '#8A95A5', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Projects</div>
              </div>
              
              <div style={{
                padding: '8px 16px',
                background: 'rgba(123, 97, 255, 0.05)',
                border: '1px solid rgba(123, 97, 255, 0.15)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ color: '#7B61FF', fontSize: '1.2rem', fontWeight: 700 }}>5+</div>
                <div style={{ color: '#8A95A5', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Hackathons</div>
              </div>
            </div>
            
            {/* Social Links Row */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <a href="https://github.com/abinavgt" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#8A95A5', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#00E5FF'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#8A95A5'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/abinavgt/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#8A95A5', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#00E5FF'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#8A95A5'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Linkedin size={20} />
              </a>
              <a href="mailto:abinav191510@gmail.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#8A95A5', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#00E5FF'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#8A95A5'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section (WebGL Eye + Particles) */}
      <ProjectsSection />

      {/* Skills Section (Neural Web Network) */}
      <SkillsSection />

      {/* Certifications Section (Glassmorphism + Ripple Waves) */}
      <CertificationsSection />

      {/* Education Timeline (Cosmic Flow) */}
      <EducationTimeline />

      {/* Contact Section & Footer */}
      <ContactSection />
    </div>
  )
}

export default App
