import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DrCard from './DrCard'

const RelatedDoctors = ({ speciality, docId, doctors = [] }) => {
  const [relDocs, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality != null) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDocs(filtered)
    } else {
      setRelDocs([])
    }
  }, [doctors, speciality, docId])

  if (relDocs.length === 0) return null

  return (
    <section className="mt-20 text-left">
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Related Doctors</h2>
          <p className="text-slate-500 text-sm">
            Browse other trusted medical professionals in this category.
          </p>
        </div>
        <Link
          to="/doctors"
          className="text-blue-800 font-bold text-sm hover:underline shrink-0"
        >
          View all
        </Link>
      </div>
      <div className="flex flex-nowrap gap-6 overflow-x-auto pb-8 justify-start">
        {relDocs.map((doctor) => (
          <div key={doctor._id} className="flex-shrink-0 w-64">
            <DrCard doctor={doctor} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedDoctors