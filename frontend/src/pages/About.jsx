import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const About = () => {
  return (
    <main className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-1 justify-center px-4 md:px-8 lg:px-40 py-12 md:py-24 bg-white">
        <div className="max-w-[1200px] flex-1">
          <div className="flex flex-col gap-12 md:flex-row md:items-center">
            <div
              className="w-full md:w-1/2 aspect-video md:aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-2xl shadow-xl border border-slate-100"
              style={{ backgroundImage: `url("${assets.about}")` }}
              aria-hidden
            />
            <div className="flex flex-col gap-6 md:gap-10 md:w-1/2">
              <div className="flex flex-col gap-5">
                <span className="text-blue-800 font-bold tracking-[0.2em] text-xs uppercase">Since 2018</span>
                <h1 className="text-slate-800 text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
                  Transforming Healthcare Through <span className="text-blue-800">Trusted Technology</span>
                </h1>
                <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">
                  Our mission is to bridge the gap between world-class medical professionals and patients globally. We believe healthcare should be accessible, reliable, and effortless for everyone, everywhere.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                <button type="button" className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-blue-800 text-white text-base font-bold transition-all hover:bg-blue-900 shadow-md">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="flex flex-1 justify-center px-4 md:px-8 lg:px-40 py-24 bg-slate-50">
        <div className="max-w-[1200px] flex-1">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-5 text-center items-center">
              <h2 className="text-slate-800 text-3xl md:text-4xl font-extrabold leading-tight">
                Our Core Values
              </h2>
              <div className="h-1 w-16 bg-blue-800 rounded-full" />
              <p className="text-slate-600 text-lg font-normal max-w-[720px]">
                We are committed to providing a professional digital healthcare experience through these fundamental pillars.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-lg transition-all">
                <div className="text-blue-800 bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl font-medium">accessibility_new</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-slate-800 text-xl font-bold">Accessibility</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Connecting patients with verified doctors 24/7 across the globe, ensuring care is never out of reach.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-lg transition-all">
                <div className="text-blue-800 bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl font-medium">verified_user</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-slate-800 text-xl font-bold">Clinical Trust</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Every medical professional undergoes a multi-step verification process to maintain the highest standards of care.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-lg transition-all">
                <div className="text-blue-800 bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl font-medium">lightbulb</span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-slate-800 text-xl font-bold">Safe Innovation</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Utilizing secure data encryption and AI to ensure a seamless and safe healthcare management experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Advisors */}
      <section className="flex flex-1 justify-center px-4 md:px-8 lg:px-40 py-24 bg-white">
        <div className="max-w-[1200px] flex-1">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col gap-3 px-4">
              <h2 className="text-slate-800 text-3xl font-extrabold leading-tight tracking-tight">Meet Our Medical Advisors</h2>
              <p className="text-slate-600 text-lg">Led by world-renowned experts in healthcare and technology.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-4">
              {[
                { name: 'Dr. Sarah Chen', role: 'Chief Medical Officer', note: 'Stanford University Alumna', img: assets.drsc },
                { name: 'Dr. Marcus Thorne', role: 'Head of Cardiology', note: '15+ Years Clinical Practice', img: assets.drmt },
                { name: 'Dr. Elena Rodriguez', role: 'Pediatric Specialist', note: 'Board Certified Pediatrician', img: assets.drer },
                { name: 'Dr. James Wilson', role: 'Surgical Consultant', note: 'Fellow of American College of Surgeons', img: assets.drjw },
              ].map((person) => (
                <div key={person.name} className="flex flex-col gap-5 group">
                  <div
                    className="w-full aspect-[3/4] bg-center bg-no-repeat bg-cover rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all border border-slate-100"
                    style={{ backgroundImage: `url("${person.img}")` }}
                  >
                    <div className="w-full h-full bg-slate-900/0 group-hover:bg-blue-800/5 transition-colors" />
                  </div>
                  <div>
                    <p className="text-slate-800 text-lg font-bold">{person.name}</p>
                    <p className="text-blue-800 text-xs font-bold uppercase tracking-widest mt-1">{person.role}</p>
                    <p className="text-slate-600 text-xs mt-1.5">{person.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-1 justify-center px-4 md:px-8 lg:px-40 py-24 bg-slate-50">
        <div className="max-w-[1200px] flex-1 bg-slate-800 rounded-[2.5rem] p-8 md:p-12 lg:p-24 relative overflow-hidden text-center flex flex-col items-center gap-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-800/10 blur-[120px] rounded-full -mr-32 -mt-32" aria-hidden />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/5 blur-[120px] rounded-full -ml-32 -mb-32" aria-hidden />
          <h2 className="text-white text-2xl md:text-3xl lg:text-5xl font-extrabold relative z-10 max-w-2xl leading-tight tracking-tight">
            Ready to experience the future of professional healthcare?
          </h2>
          <p className="text-slate-300 text-base md:text-lg relative z-10 max-w-xl font-medium">
            Join thousands of patients who have already streamlined their medical care with HealthCare Connect.
          </p>
          <div className="flex flex-col md:flex-row gap-5 relative z-10">
            <Link to="/register">
              <button type="button" className="bg-blue-800 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-900 transition-all shadow-lg active:scale-95">
                Create an Account
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About