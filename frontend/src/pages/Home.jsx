import React from 'react'
import Header from '../components/Header.jsx'
import SpecialityMenu from '../components/SpecialityMenu.jsx'
import { assets } from '../assets/assets.js'

const Home = () => {
  return (
    <main className="max-w-[1200px] mx-auto px-6 lg:px-10">
      <Header />
      <SpecialityMenu />

      {/* Seamless Healthcare */}
      <section className="py-16 bg-slate-100 rounded-[2.5rem] my-12 px-10 border border-slate-200">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-blue-800">Seamless Healthcare</h2>
          <p className="text-slate-600 max-w-[650px] mx-auto text-lg">
            Connect with elite medical professionals through our streamlined three-step process.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center">
            <div className="size-20 bg-blue-800 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <span className="material-symbols-outlined text-4xl">person_search</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-800">1. Discovery</h3>
            <p className="text-sm text-slate-600 leading-relaxed px-4">
              Identify the right specialist from our vetted database of global healthcare providers.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="size-20 bg-blue-800 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <span className="material-symbols-outlined text-4xl">event_available</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-800">2. Scheduling</h3>
            <p className="text-sm text-slate-600 leading-relaxed px-4">
              Select a convenient consultation slot that fits perfectly with your personal schedule.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="size-20 bg-blue-800 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <span className="material-symbols-outlined text-4xl">volunteer_activism</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-800">3. Consultation</h3>
            <p className="text-sm text-slate-600 leading-relaxed px-4">
              Receive professional medical advice either in-person or via secure tele-consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Patient Perspectives */}
      <section className="py-20">
        <h2 className="text-3xl font-bold mb-12 px-4 text-slate-800 text-center">Patient Perspectives</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[
            { quote: '"The efficiency of this platform is unmatched. Finding a reliable dentist for an emergency was handled with absolute professionalism."', name: 'Sarah Jenkins', role: 'Patient since 2023' },
            { quote: '"The secure teleconsultation feature bridged the gap between my busy schedule and my health requirements perfectly."', name: 'Michael Chen', role: 'Verified User' },
            { quote: '"Transparency in reviews and doctor qualifications helped me make an informed decision for my family\'s specialist care."', name: 'Robert Wilson', role: 'Family Plan Member' },
            { quote: '"The user-friendly interface and quick appointment booking made managing my family\'s healthcare needs effortless. Highly recommend!"', name: 'Emily Rodriguez', role: 'Patient since 2024' },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-8 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex text-blue-800 mb-5 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px] fill-current">star</span>
                  ))}
                </div>
                <p className="italic text-slate-700 leading-relaxed mb-8 text-sm">{testimonial.quote}</p>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <img 
                  src={assets.userImage} 
                  alt={testimonial.name}
                  className="size-11 rounded-full object-cover shadow-sm shrink-0"
                />
                <div>
                  <p className="font-bold text-sm text-slate-800">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home