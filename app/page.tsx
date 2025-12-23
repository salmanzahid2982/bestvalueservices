'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Star, CheckCircle, ArrowRight, Truck, Wrench, Zap, Droplets, ShoppingBag, Home, Smartphone, ShieldCheck, Award, Users, Clock, Menu, X, Sun, Moon, Sparkles as SparklesIcon } from 'lucide-react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'

const Scene = () => {
  const ref = useRef<any>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.mouse.y * 0.1
      ref.current.rotation.y = state.mouse.x * 0.1
    }
  })

  const birds = useMemo(() => Array.from({ length: 40 }).map(() => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10
    ] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
    scale: Math.random() * 0.5 + 0.5
  })), [])

  return (
    <group ref={ref}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Sparkles count={200} scale={[20, 20, 10]} size={3} speed={0.4} opacity={0.5} color="#60a5fa" />
      {birds.map((bird, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={bird.position} rotation={bird.rotation} scale={bird.scale}>
            <coneGeometry args={[0.08, 0.2, 3]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

const HomePage = () => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Scene />
        </Canvas>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? (isDark ? 'bg-slate-900/90 backdrop-blur-md shadow-md py-4' : 'bg-white/90 backdrop-blur-md shadow-md py-4') : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
              <SparklesIcon className="text-white w-6 h-6" />
            </div>
            <div className={`flex flex-col leading-none ${isScrolled ? (isDark ? 'text-white' : 'text-gray-800') : 'text-white'}`}>
              <span className="font-bold text-xl tracking-tight">Comfort</span>
              <span className={`text-xs font-bold tracking-widest uppercase ${isScrolled ? (isDark ? 'text-blue-400' : 'text-blue-600') : 'text-blue-200'}`}>Home Services</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium hover:text-blue-400 transition-colors ${isScrolled ? (isDark ? 'text-gray-300' : 'text-gray-700') : 'text-white'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors ${isScrolled ? (isDark ? 'text-yellow-400 hover:bg-slate-800' : 'text-slate-700 hover:bg-gray-100') : 'text-white hover:bg-white/10'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${isScrolled ? (isDark ? 'text-yellow-400' : 'text-slate-700') : 'text-white'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className={isScrolled ? (isDark ? 'text-white' : 'text-gray-800') : 'text-white'} /> : <Menu className={isScrolled ? (isDark ? 'text-white' : 'text-gray-800') : 'text-white'} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}
            >
              <div className="flex flex-col p-6 gap-4">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-left font-medium py-2 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={targetRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            variants={fadeInUp}
          >
            Professional Home{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-yellow-300">
              Utility Services
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Expert water tank cleaning, pest control, and home maintenance services with guaranteed quality and customer satisfaction.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <motion.button 
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-bold rounded-full text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" /> Contact Us
            </motion.button>
            <motion.button 
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('services')}
            >
              View Services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Contact Cards */}
        <motion.div 
          className="absolute top-10 right-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white hidden lg:block"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <FaPhoneAlt className="text-cyan-300" />
            <span className="font-semibold">Call Now</span>
          </div>
          <p className="text-lg font-bold">+91 7888745047</p>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white hidden lg:block"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <FaWhatsapp className="text-green-400" />
            <span className="font-semibold">WhatsApp</span>
          </div>
          <p className="text-lg font-bold">+91 9041290507</p>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Comfort Home</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We are a trusted family business serving communities for over 10 years with exceptional home utility services.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Why Choose Comfort Home?</h3>
              <div className="space-y-6">
                {[
                  { icon: CheckCircle, title: "Licensed & Insured", desc: "Fully licensed professionals with comprehensive insurance coverage" },
                  { icon: Users, title: "Experienced Team", desc: "Over 10 years of experience in home utility services" },
                  { icon: Award, title: "Quality Guarantee", desc: "100% satisfaction guarantee on all our services" },
                  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer support and emergency services" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.title}</h4>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg leading-relaxed mb-6">
                  To provide exceptional home utility services that enhance the comfort, health, and well-being of our customers through professional, reliable, and eco-friendly solutions.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">24/7</div>
                    <div className="text-sm">Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section id="services" className={`py-20 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Our Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Services</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We offer a comprehensive range of home solutions tailored to your needs.
            </p>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                id: "water-tank",
                title: "Professional Water Tank Cleaning",
                description: "Ensure your family's health with our mechanized dewatering, sludge removal, and high-pressure cleaning services. We remove dirt, bacteria, and algae to provide you with crystal clear water.",
                features: ["Mechanized Dewatering", "Sludge Removal", "High-Pressure Cleaning", "Anti-bacterial Spray"],
                image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1000&auto=format&fit=crop",
                icon: Droplets,
                reverse: false
              },
              {
                id: "shifting",
                title: "Home Shifting & Moving Services",
                description: "Relocating? We make moving hassle-free. From packing your delicate items to safely transporting furniture and appliances, our experienced team handles everything with care.",
                features: ["Professional Packing", "Safe Transportation", "Loading & Unloading", "Furniture Assembly"],
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
                icon: Truck,
                reverse: true
              },
              {
                id: "repair",
                title: "Appliance Repair & Maintenance",
                description: "Don't let a broken fridge or washing machine disrupt your routine. Our skilled technicians provide quick and reliable repairs for all major brands of household appliances.",
                features: ["Refrigerator Repair", "Washing Machine Fix", "Microwave Service", "Genuine Spare Parts"],
                image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop",
                icon: Wrench,
                reverse: false
              },
              {
                id: "utility",
                title: "Electrical & Plumbing Solutions",
                description: "From fixing electrical fractures and wiring to resolving plumbing leaks and water solutions. We handle geyser installation, tap repairs, and complete home utility maintenance.",
                features: ["Wiring & Switchboard", "Geyser Repair", "Leakage Fixes", "Pipe Fitting"],
                image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop",
                icon: Zap,
                reverse: true
              },
              {
                id: "buysell",
                title: "Buy & Sell Used Appliances",
                description: "Want to upgrade? Sell your old fridge, washing machine, or other gadgets at the best price. We also offer quality checked used appliances for sale.",
                features: ["Best Value for Old Items", "Instant Payment", "Quality Checked Sales", "Doorstep Pickup"],
                image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop",
                icon: ShoppingBag,
                reverse: false
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                id={service.id}
                className={`flex flex-col lg:flex-row gap-12 items-center ${service.reverse ? 'lg:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 w-full">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-full w-fit mb-4">
                        <service.icon className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{service.title}</h3>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* <motion.button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-5 h-5" /> Book Service
                  </motion.button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Comfort Home</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We combine experience, technology, and customer care to deliver unmatched service quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Award, 
                title: "Certified Professionals", 
                desc: "Licensed and trained experts with years of experience"
              },
              { 
                icon: CheckCircle, 
                title: "Quality Guarantee", 
                desc: "100% satisfaction guarantee on all our services"
              },
              { 
                icon: Users, 
                title: "Customer Focused", 
                desc: "Personalized service tailored to your specific needs"
              },
              { 
                icon: Clock, 
                title: "24/7 Support", 
                desc: "Round-the-clock customer support and emergency services"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-300 border border-transparent ${isDark ? 'bg-slate-800 hover:bg-slate-700 hover:border-slate-600' : 'bg-gray-50 hover:bg-white hover:shadow-xl hover:border-gray-100'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner",
                content: "The water tank cleaning service was exceptional. The team was professional, punctual, and left everything spotless. Highly recommended!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Property Manager",
                content: "We use Comfort Home for all our properties. Their pest control and maintenance services are reliable and effective.",
                rating: 5
              },
              {
                name: "Emily Davis",
                role: "Restaurant Owner",
                content: "Outstanding service! They handled our emergency plumbing issue quickly and efficiently. Great customer support.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-200 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="text-lg font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Map Section */}
      <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Service Area</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              We serve Qadian (143516) and a 15km radius surrounding it. Check the map below to see our coverage area.
            </p>
          </motion.div>

          <motion.div 
            className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
             <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54427.72828566346!2d75.3662563!3d31.8208365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a6d6a6a6a6d%3A0x6a6a6a6a6a6a6a6a!2sQadian%2C%20Punjab!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg z-10">
              <p className="font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="text-red-500 w-5 h-5" /> Qadian + 15km Radius
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="text-white w-6 h-6" />
                </div>
                <div className="flex flex-col leading-none text-white">
                  <span className="font-bold text-xl tracking-tight">Comfort</span>
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Home Services</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted partner for professional home utility services. Making homes cleaner, safer, and more comfortable.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <button onClick={() => scrollToSection(item.toLowerCase())} className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" /> {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-400 shrink-0" />
                  <span className="text-gray-400">Qadian, Punjab (15km Radius)</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-400 shrink-0" />
                  <div className="flex flex-col">
                    <a href="tel:+917888745047" className="text-gray-400 hover:text-white">+91 7888745047</a>
                    <a href="tel:+919041290507" className="text-gray-400 hover:text-white">+91 9041290507</a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-400 shrink-0" />
                  <a href="mailto:fa3208581@gmail.com" className="text-gray-400 hover:text-white">fa3208581@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Home Services Qadian. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-gray-900'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />

              <button
                onClick={() => setIsContactModalOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8 relative">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-all duration-300">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">Get in Touch</h3>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>We're just a call away!</p>
              </div>

              <div className="space-y-4 relative">
                <a href="tel:+917888745047" className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-blue-50 hover:shadow-md'}`}>
                  <div className={`p-3 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} group-hover:scale-110 transition-transform`}>
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Primary Contact</p>
                    <p className="font-bold text-xl">+91 7888745047</p>
                  </div>
                </a>

                <a href="tel:+919041290507" className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-green-50 hover:shadow-md'}`}>
                  <div className={`p-3 rounded-full ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'} group-hover:scale-110 transition-transform`}>
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>WhatsApp / Secondary</p>
                    <p className="font-bold text-xl">+91 9041290507</p>
                  </div>
                </a>

                <a href="mailto:fa3208581@gmail.com" className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-purple-50 hover:shadow-md'}`}>
                  <div className={`p-3 rounded-full ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'} group-hover:scale-110 transition-transform`}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email Address</p>
                    <p className="font-bold text-lg break-all">fa3208581@gmail.com</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage
