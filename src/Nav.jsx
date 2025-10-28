import React from 'react'

function Nav() {
    const card = [
        {
            title: "Fast Learning",
            text: "Understand Tailwind CSS concepts quickly and apply them instantly.",
        },
        {
            title: "Responsive Design",
            text: "Your layouts adapt perfectly to mobile, tablet, and desktop screens.",
        },
        {
            title: "Utility First",
            text: "Style your app using pre-built utility classes directly in your markup.",
        },
        {
            title: "Customizable",
            text: "Tailwind allows you to customize colors, spacing, and themes easily.",
        },
        {
            title: "Performance",
            text: "Small and optimized CSS builds for better load times.",
        },
        {
            title: "Community",
            text: "Active community and ecosystem to help you grow as a developer.",
        },
    ]
    return (
        <section className='bg-gray-600 text-white py-16 px-6 md:px-16'>
            <div className='container flex-col md:flex-row justify-between mx-auto items-center'>
                <div className='tetx-center  md:text-left md:w-1/2 space-y-6'>
                    <h1 className='text-black text-3xl  sm:text-4xl md:text-5xl font-bold leading-tight'>
                        Build Responsive Websites with Tailwind CSS
                    </h1>
                    <p className='text-gray-400 text-base sm:text-lg md:text-xl'>
                        Learn how to create modern, mobile-friendly layouts easily using Tailwind’s responsive utilities.
                    </p>
                    <button className='  px-6 py-3 hover:bg-neutral-500 border border-neutral-900 bg-neutral-600 text-black  rounded-lg text-lg '>
                        Get Started
                    </button>
                </div>
                <div className='mt-10 md:mt-0 md:w1/2 flex justify-center'>
                    <img
                        src="https://cdn.pixabay.com/photo/2017/05/31/16/39/windows-2360920_1280.png"
                        alt="Hero"
                        className="w-full max-w-md rounded-lg "
                    />

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {
                        card.map((item, index) => (
                            <div key={index}
                                className='bg-gray-300 rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-4 hover:bg-gray-600'
                            >
                                <h3 className="text-xl font-semibold mb-2 text-blue-400">
                                    {card.title}
                                </h3>
                                <p className="text-gray-300">{card.text}</p>
                            </div>
                        ))}

                </div>

            </div>
            <footer className=' bg-gray-700 text-white px-6 py-8 mt-10 md:mt-10'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-white">Company</h3>
                        <ul className='space-y-2'>
                            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400">Blog</a></li>

                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-white">Company</h3>
                        <ul className='space-y-2'>
                            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400">Blog</a></li>

                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-white">Company</h3>
                        <ul className='space-y-2'>
                            <li>Email: info@example.com</li>
                            <li>Phone: +91 99999 99999</li>

                        </ul>
                    </div>
                     <div>
                        <h3 className="text-xl font-semibold mb-3 text-white">Follow us</h3>
                        <ul className='space-x-4'>
                           <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
            <a href="#" className="hover:text-blue-400">GitHub</a>
                        </ul>
                    </div>

                </div>
                 <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © 2025 MyWebsite. All rights reserved.
      </div>

            </footer>

        </section>
    )
}

export default Nav