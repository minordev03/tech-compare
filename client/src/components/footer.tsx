import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[var(--neutral-900)] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-balance-scale text-white text-sm" />
              </div>
              <span className="text-xl font-bold">Tech-Compare</span>
            </div>
            <p className="text-gray-400 mb-4">
              Making informed decisions through comprehensive product and service comparisons.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/category/software" className="hover:text-white transition-colors">Software</Link></li>
              <li><Link href="/category/electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/category/appliances" className="hover:text-white transition-colors">Home Appliances</Link></li>
              <li><Link href="/category/automotive" className="hover:text-white transition-colors">Automotive</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; 2024 Tech-Compare. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">Powered by intelligent comparison technology</p>
        </div>
      </div>
    </footer>
  );
}
