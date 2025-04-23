import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
export default function Footer() {
    const socialIcons = [
        { icon: <FaFacebook />, name: 'Facebook' },
        { icon: <FaTwitter />, name: 'Twitter' },
        { icon: <FaInstagram />, name: 'Instagram' },
        { icon: <FaLinkedin />, name: 'LinkedIn' },
    ];

    const footerSections = [
        {
            title: 'Shop',
            items: ['All Products', 'Featured', 'New Arrivals', 'Sale'],
        },
        {
            title: 'Support',
            items: ['Contact Us', 'FAQs', 'Shipping', 'Returns'],
        },
        {
            title: 'Company',
            items: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'],
        },
    ];

    return (
        <footer className="w-full bg-primary-light text-foreground  px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-8 flex flex-wrap justify-between items-start gap-8">

                {/* Brand & Social */}
                <div className="flex flex-col space-y-4 max-w-xs">
                    <Image
                        src="/assets/naatuSandhai.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className="object-cover"
                    />
                    <p className="text-sm text-black">Premium products for your everyday needs. Quality you can trust.</p>

                </div>

                {/* Footer Sections */}
                <div className="flex flex-wrap gap-8 flex-grow">
                    {footerSections.map((section) => (
                        <div key={section.title} className="space-y-3 min-w-[120px]">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
                                {section.title}
                            </h3>
                            <ul className="space-y-1">
                                {section.items.map((item) => (
                                    <li
                                        key={item}
                                        className="text-sm text-black cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                {/* <div className="flex flex-col space-y-3 max-w-xs">
                    <p className="text-sm text-white">Get updates on promotions, new products, and sales. No spam.</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-primary text-white rounded cursor-pointer transition"
                    >
                        Subscribe
                    </button>
                </div> */}
                <div className="flex flex-col space-y-3 max-w-xs">
                    <p className="text-sm text-black">Get updates on promotions, new products, and sales. No spam.</p>
                    <div className="flex space-x-3">
                        {socialIcons.map((item) => (
                            <div
                                key={item.name}
                                className="p-2 bg-white rounded-full  transition"
                                title={item.name}
                            >
                                <span className="text-blood cursor-pointer">{item.icon}</span>
                            </div>

                        ))}
                    </div>
                </div>

            </div>

            {/* Footer Bottom */}
            <div className="mt-6 text-center text-sm text-black py-4 border-t border-gray-300">
                &copy; {new Date().getFullYear()} Naatu Sandhai. All rights reserved.
            </div>
        </footer>
    )
}      