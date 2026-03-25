import { useRef, useState } from 'react';
import { Shield, Code, Database, BookOpen, Cpu, Brain, ExternalLink } from 'lucide-react';

// Import certificate images
import pythonImg from '../assets/certifications/Python.png'
import dsaImg from '../assets/certifications/DSA.png'
import vitalSkillsImg from '../assets/certifications/Vital Skills.png'
import nptelImg from '../assets/certifications/NPTEL.png'
import internzLearnImg from '../assets/certifications/Internz Learn.png'
import csePathsalaImg from '../assets/certifications/CSE Pathsala.png'
import freeCodeCampImg from '../assets/certifications/FreeCodeCamp.png'

const CERTS = [
    {
        id: 1,
        title: 'Python',
        issuer: 'HackerRank',
        date: '2026',
        icon: Code,
        color: '#4B8BBE',
        image: pythonImg,
        link: '#',
        desc: 'Skill certification test covering Python syntax, data types, and basic algorithmic logic.'
    },
    {
        id: 2,
        title: 'CodeQuest: DSA Summer Bootcamp',
        issuer: 'Lovely Professional University (LPU)',
        date: '2025',
        icon: BookOpen,
        color: '#FFD93D',
        image: dsaImg,
        link: '#',
        desc: 'Intensive skill development course on Data Structures and Algorithms (DSA) "From Basics to Brilliance."'
    },
    {
        id: 3,
        title: 'Data Science and Analytics',
        issuer: 'Vital Skills (IIT Kanpur)',
        date: '2025',
        icon: Brain,
        color: '#7B61FF',
        image: vitalSkillsImg,
        link: '#',
        desc: 'Winter internship program focused on data analysis, statistical methods, and data science workflows.'
    },
    {
        id: 4,
        title: 'Privacy and Security in Online Social Media',
        issuer: 'NPTEL / SWAYAM (IIT Madras)',
        date: '2025',
        icon: Shield,
        color: '#00E5FF',
        image: nptelImg,
        link: '#',
        desc: 'A 12-week academic course covering security vulnerabilities, data privacy, and trust in social media platforms.'
    },
    {
        id: 5,
        title: 'Java Application Development',
        issuer: 'Internz Learn',
        date: '2024',
        icon: Cpu,
        color: '#FF6B6B',
        image: internzLearnImg,
        link: '#',
        desc: 'Practical internship experience involving the completion of live projects using Java.'
    },
    {
        id: 6,
        title: 'Mastering in C: Basic to Beyond',
        issuer: 'CSE Pathshala',
        date: '2024',
        icon: Code,
        color: '#68A063',
        image: csePathsalaImg,
        link: '#',
        desc: 'A 25-hour live course focused on C programming fundamentals, advanced concepts, and project-based learning.'
    },
    {
        id: 7,
        title: 'Legacy Responsive Web Design V8',
        issuer: 'freeCodeCamp',
        date: '2023',
        icon: Code,
        color: '#0a0a23',
        image: freeCodeCampImg,
        link: '#',
        desc: 'Approximately 300 hours of coursework covering HTML5, CSS3, Flexbox, CSS Grid, and responsive design principles.'
    },
];

export default function CertificationsSection() {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setHoveredIdx(index);

        const rects = cardRefs.current.map(el => el?.getBoundingClientRect());
        const origin = rects[index];
        if (!origin) return;

        const originX = origin.left + origin.width / 2;
        const originY = origin.top + origin.height / 2;

        cardRefs.current.forEach((el, j) => {
            if (j === index || !el) return;
            const target = rects[j];
            if (!target) return;

            const targetX = target.left + target.width / 2;
            const targetY = target.top + target.height / 2;

            const distance = Math.hypot(originX - targetX, originY - targetY);
            const delay = distance * 1.5;

            el.animate([
                { transform: 'scale(1)', backgroundColor: 'rgba(5, 8, 20, 0.65)', borderColor: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 0 0 rgba(0,0,0,0)', filter: 'brightness(1) blur(2px)' },
                { transform: 'scale(1.025)', backgroundColor: 'rgba(20, 30, 50, 0.85)', borderColor: 'rgba(108, 92, 231, 0.6)', boxShadow: '0 0 25px rgba(0, 229, 255, 0.1)', filter: 'brightness(1.1) blur(0px)', offset: 0.3 },
                { transform: 'scale(1)', backgroundColor: 'rgba(5, 8, 20, 0.65)', borderColor: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 0 0 rgba(0,0,0,0)', filter: 'brightness(1) blur(2px)' }
            ], {
                duration: 900,
                delay: delay,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'none'
            });
        });
    }

    return (
        <section id="certifications" style={{
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            background: '#02030A',
            backgroundImage: 'radial-gradient(circle at 50% 10%, #05070D 0%, #02030A 100%)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '6rem 2rem',
            zIndex: 1
        }}>
            {/* Noise Background */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
                pointerEvents: 'none',
                zIndex: -1
            }} />

            <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 10 }}>
                <h2 style={{ color: '#fff', fontSize: '2.5rem', margin: 0, letterSpacing: '3px', fontWeight: 300 }}>CERTIFICATIONS</h2>
                <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)', margin: '15px auto 0' }} />
                <p style={{ color: '#778', fontSize: '0.95rem', marginTop: '15px', maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
                    Courses and certifications I've earned along the way.
                </p>
            </div>

            <div className="cert-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2.5rem',
                width: '100%',
                maxWidth: '1200px',
                zIndex: 10
            }}>
                {CERTS.map((cert, i) => {
                    const Icon = cert.icon;
                    const isHovered = hoveredIdx === i;
                    const isOtherHovered = hoveredIdx !== null && hoveredIdx !== i;

                    return (
                        <div
                            key={cert.id}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            style={{
                                background: 'rgba(5, 8, 20, 0.65)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                padding: '0',
                                color: '#E0E6FF',
                                backdropFilter: 'blur(10px)',
                                position: 'relative',
                                cursor: 'default',
                                overflow: 'hidden',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                transform: isHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
                                opacity: isOtherHovered ? 0.4 : 1,
                                filter: isOtherHovered ? 'blur(2px) grayscale(50%)' : 'blur(0px) grayscale(0%)',
                                zIndex: isHovered ? 10 : 1,
                                boxShadow: isHovered ? '0 10px 40px rgba(0, 229, 255, 0.2)' : '0 4px 15px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Inner active ambient glow */}
                            <div style={{
                                position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                                background: `radial-gradient(circle at center, ${isHovered ? '#00E5FF' : cert.color}15 0%, transparent 60%)`,
                                opacity: isHovered ? 1 : 0,
                                transition: 'opacity 0.6s ease',
                                pointerEvents: 'none',
                                zIndex: 0
                            }} />

                            {/* Certificate Thumbnail Preview */}
                            <div style={{
                                width: '100%',
                                height: '160px',
                                overflow: 'hidden',
                                borderBottom: `1px solid ${isHovered ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.05)'}`,
                                transition: 'border-color 0.4s ease',
                                position: 'relative',
                                zIndex: 1,
                            }}>
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        opacity: isHovered ? 1 : 0.7,
                                        transition: 'opacity 0.4s ease, transform 0.6s ease',
                                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                    }}
                                />
                                {/* Dark gradient overlay at bottom of image */}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                                    background: 'linear-gradient(transparent, rgba(5, 8, 20, 0.9))',
                                    pointerEvents: 'none'
                                }} />
                            </div>

                            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem 2rem 2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.04)',
                                        color: isHovered ? '#00E5FF' : '#A0AABF',
                                        transition: 'all 0.4s ease',
                                        boxShadow: isHovered ? '0 0 15px rgba(0,229,255,0.2)' : 'none',
                                    }}>
                                        <Icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: '#56617A', letterSpacing: '1px', fontFamily: 'monospace' }}>
                                        {cert.date}
                                    </span>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: '0 0 4px 0', lineHeight: '1.4', color: isHovered ? '#ffffff' : '#E0E6FF', transition: 'color 0.4s ease' }}>
                                        {cert.title}
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: '#6C5CE7', margin: '0 0 8px 0', fontWeight: 500, letterSpacing: '0.5px' }}>
                                        {cert.issuer}
                                    </p>
                                    <p style={{ fontSize: '0.78rem', color: '#778899', margin: 0, lineHeight: '1.5' }}>
                                        {cert.desc}
                                    </p>
                                </div>

                                {/* Verify Link Removed */}
                            </div>

                            {/* Liquid neon bottom-edge tracking */}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, height: '2px', width: '100%',
                                background: `linear-gradient(90deg, transparent, ${isHovered ? '#00E5FF' : '#444'}, transparent)`,
                                opacity: isHovered ? 1 : 0.2,
                                transition: 'all 0.4s ease',
                            }} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
