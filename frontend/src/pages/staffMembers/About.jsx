import React from "react";
import {
  FaHome,
  FaPlus,
  FaShare,
  FaShower,
  FaLayerGroup,
  FaServicestack,
  FaCalendarCheck,
  FaRing,
  FaArrowDown,
  FaEdit,
  FaRemoveFormat,
  FaCog
} from "react-icons/fa";

const About = () => {
    const pillars = [
    { 
      id: 1, 
      pillar: 'Digital Integrity', 
      focus: 'Ensuring 100% data accuracy and secure access for authorized personnel.',
      
    },
    { 
      id: 2, 
      pillar: 'Sustainability', 
      focus: 'Moving toward a paperless administration to support HU green initiatives.',
      
    },
    { 
      id: 3, 
      pillar: 'User Empowerment', 
      focus: 'Providing an intuitive interface that allows staff to manage inventory easily.',
      
    },
    { 
      id: 4, 
      pillar: 'Scalability', 
      focus: 'Designing a system that grows alongside the university’s expanding campus.',
  
    },
  ];


  return (
    <div className=" px-2">
        <div className="flex justify-between items-center mb-12 mt-6">
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p className="text-sm text-gray-600">
                  <span className="text-green-600 font-semibold">Monday</span> · 02 March 2025
                </p>
              </div>
    
              <div className="flex items-center gap-6">
                <FaCalendarCheck className="text-xl text-gray-600 cursor-pointer" />
                <FaRing className="text-xl text-gray-600 cursor-pointer" />
    
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-lg font-bold">
                    BY
                  </span>
                  <span className="font-medium">Beneyam Yohannes</span>
                  <FaArrowDown className="text-gray-600" />
                </div>
              </div>
            </div>
      {/* Header */}
      <div className="mb-6 bg-green-200 px-5 py-2 rounded-xl">
        <h1 className="text-3xl font-bold text-green-700">
          HU Inventory Management System
        </h1>
        <p className="text-gray-500 mt-1">
          Haramaya University – Inventory & Resource Management
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <div className="flex flex-col gap-4 justify-center pt-3 pb-5 px-12   ">
                <h1 className="text-5xl font-bold ">About Us</h1>
                <p>
                    Founded on the principles of academic rigor and institutional progress, Haramaya University has evolved since its inception in 1954 into a leading research institution in Ethiopia. With rapid expansion across multiple colleges—ranging from Agriculture and Health Sciences to Engineering and Social Sciences—the complexity of managing the university's physical capital has grown exponentially.</p>
                <p>
                    The Haramaya University Inventory Management System (HU-IMS) is a strategic digital transformation project designed to replace legacy, paper-based tracking with a state-of-the-art, data-driven ecosystem. Built using the MERN Stack (MongoDB, Express.js, React, Node.js), HU-IMS serves as a unified platform that bridges the gap between procurement, department-level utilization, and administrative oversight.</p>
                <p>
                    By digitizing our asset lifecycle—from high-precision laboratory instruments to campus-wide IT infrastructure—we ensure that Haramaya University's resources are managed with the highest degree of efficiency, supporting our researchers, faculty, and students in their pursuit of excellence.</p>
        </div>

        <div className="flex gap-10 justify-center items-center pb-10">
            <div className="bg-green-100 p-7.5 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold text-center mb-2">
                    System Objectives
                </h2>
                <ul className="list-disc  space-y-1">
                    <li>Centralize inventory records for all departments</li>
                    <li>Reduce inventory loss and duplication</li>
                    <li>Improve request and approval workflows</li>
                    <li>Provide real-time reporting and audit trails</li>
                </ul>
                </div>

        
            <div className="bg-green-100 p-4 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold text-center mb-2">
                    User Roles
                </h2>
                <ul className="list-none space-y-1">
                    <li><strong>Staff Members:</strong> Submit and track inventory requests</li>
                    <li><strong>Store Managers:</strong> Manage inventory, fulfill requests</li>
                    <li><strong>Department Heads:</strong> Approve department-level requests</li>
                    <li><strong>University Authorities:</strong> System oversight and auditing</li>
                    <li><strong>Administrators:</strong> User and system management</li>
                </ul>
            </div>
        </div>
        

        
        <div className="px-9 mx-3 border-t py-10 flex flex-col gap-2">
          <h2 className="text-5xl  font-bold mb-2">
            Vision
          </h2>
          <p>
            "To be the national benchmark for digital resource stewardship in higher education, fostering a Smart Campus environment where technology and accountability drive institutional success."
          </p>
          <p>
            We envision a future for Haramaya University where every physical asset is a live data point, contributing to a seamless, transparent, and optimized academic environment. We aim to lead the digital revolution in Ethiopia’s education sector by demonstrating how smart logistics can directly enhance research output and administrative quality.
          </p>
        </div>

        <div className="px-9 mx-3 border-t py-10 flex flex-col gap-2">
          <h2 className="text-5xl  font-bold mb-2">
            Mission Statement
          </h2>
          <p>
            The mission of the HU-IMS project is to safeguard the university’s investments and optimize resource distribution through:
            </p>
            <div className="px-15 py-1">
                <li><span className="font-bold">Operational Excellence:</span> Modernizing asset tracking with real-time updates and QR-code integration to eliminate manual errors.</li>

                <li><span className="font-bold">Institutional Transparency:</span> Providing a clear, auditable trail of every item’s movement, ensuring absolute accountability across all departments.</li>

                <li><span className="font-bold">Resource Optimization:</span> Identifying surplus and scarcity in real-time to ensure that every laboratory and classroom is equipped for success without wasteful spending.</li>
                <li><span className="font-bold">Preventative Maintenance:</span> Utilizing automated scheduling to extend the lifespan of expensive scientific and technical equipment.</li>

                <li><span className="font-bold">Empowering Decisiveness:</span> Equipping HU leadership with advanced analytics to make evidence-based decisions regarding procurement and infrastructure development.</li>
                
            </div>

            <div className="my-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Strategic Pillar</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Institutional Focus Area</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {pillars.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-800">{item.pillar}</span>
                            </div>
                        </td>
                        <td className="px-6 py-5 text-gray-600 leading-relaxed">
                            {item.focus}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>     
        </div>
        <div className="px-9 mx-3 border-t py-10 flex mb-10 flex-col gap-2">
            <h2 className="text-5xl  font-bold mb-2">
                Core Values
            </h2>
            <div className="px-10">
                <li><span className="font-bold">Accountability:</span> We take ownership of the university’s resources as a collective responsibility.</li>
                <li><span className="font-bold">Innovation:</span> We embrace the latest technologies to solve the complex logistical challenges of a modern university.</li>
                <li><span className="font-bold">Precision:</span> In the world of research and education, every detail—and every item—counts.</li>
                <li><span className="font-bold">Service:</span> Our system exists to serve the faculty and students who are the heart of Haramaya University.</li>
            </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 pb-2 border-t text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Haramaya University Inventory Management System
        <h1 className="text-blue-600 underline cursor-pointer hover:font-semibold">Meet the developer Team? </h1>
      </div>
    </div>
  );
};

export default About;
