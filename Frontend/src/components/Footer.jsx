import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, BriefcaseBusiness, Facebook, Instagram, Mail, Send, Sparkles, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';
import { baseUrl } from '../Baseurl';
import { siteConfig } from '../siteConfig';

function Footer() {
    const [email, setEmail] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 450);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(`${baseUrl}/newslatter/subscribe`, { email });
            toast.success(data.message || 'Thanks for subscribing!');
            setEmail('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Subscription failed. Please try again.');
        }
    };

    const servicesLinks = [
        ['TrendingJobs', '/Job-Portal'],
        ['Job for fresher', '/Fresher-Jobs'],
        ['Job for Experienced', '/Experienced-Jobs'],
        ['Internship', '/Internships'],
        ['Interview Guide', '/Blogs'],
    ];
    const informationLinks = [
        ['About Us', '/About'],
        ['Contact', '/Contact'],
        ['Terms of Use', '/terms'],
        ['Privacy Policy', '/privacy-policy'],
    ];

    return (
        <>
            {showScrollTop && (
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top"
                    className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition hover:-translate-y-1 hover:bg-teal-500"
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            )}
            <footer className="site-footer">
                <div className="site-footer__inner">
                    <div className="site-footer__main">
                        <div className="site-footer__brand">
                            <Link to="/" className="site-footer__wordmark">
                                <span className="site-footer__mark" aria-hidden="true">
                                    <BriefcaseBusiness />
                                </span>
                                <span>THEJOBINFO</span>
                            </Link>
                            <a className="site-footer__email" href="mailto:dcodermail1@gmail.com">
                                <Mail aria-hidden="true" />
                                dcodermail1@gmail.com
                            </a>
                            <a className="site-footer__website" href={siteConfig.url} target="_blank" rel="noopener noreferrer">
                                {siteConfig.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </a>
                            <div className="site-footer__socials" aria-label="Follow TheJobInfo">
                                <a href="https://t.me/dcoder75" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                                    <Send aria-hidden="true" />
                                </a>
                                <a href="https://www.instagram.com/the.jobinfo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram aria-hidden="true" />
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61585880087988" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <Facebook aria-hidden="true" />
                                </a>
                                <a href="https://www.youtube.com/@d-coder1898" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <Youtube aria-hidden="true" />
                                </a>
                            </div>
                        </div>

                        <nav className="site-footer__nav" aria-label="Services">
                            <h2 className="site-footer__heading">Services</h2>
                            <ul>
                                {servicesLinks.map(([label, href]) => (
                                    <li key={href}>
                                        <Link to={href}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav className="site-footer__nav" aria-label="Company">
                            <h2 className="site-footer__heading">Company</h2>
                            <ul>
                                {informationLinks.map(([label, href]) => (
                                    <li key={href}>
                                        <Link to={href}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <section className="site-footer__newsletter" aria-labelledby="footer-newsletter-title">
                            <span className="site-footer__newsletter-kicker">
                                <Sparkles aria-hidden="true" />
                                Career notes, delivered
                            </span>
                            <h2 id="footer-newsletter-title" className="site-footer__newsletter-title">A little more signal. A lot less noise.</h2>
                            <p>Subscribe to get the latest updates, coding tips, and interview preparation resources.</p>
                            <form onSubmit={handleSubmit}>
                                <label className="sr-only" htmlFor="footer-email">Your email address</label>
                                <input
                                    id="footer-email"
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    placeholder="Your email address"
                                    autoComplete="email"
                                    required
                                />
                                <button type="submit">Subscribe <ArrowRight aria-hidden="true" /></button>
                            </form>
                            <span className="site-footer__subscriber-count"><span aria-hidden="true" /> Join 10K+ subscribers</span>
                        </section>
                    </div>

                    <div className="site-footer__bottom">
                        <p>© 2026 THEJOBINFO All rights reserved.</p>
                        <p>Made with <span aria-label="love">♥</span> for aspiring developers</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
