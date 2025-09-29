import Link from 'next/link'import Link from 'next/link'import Image from "next/image";

import { CloudIcon, KeyIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

import { CloudIcon, KeyIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Home() {

  return (export default function Home() {

    <div className="min-h-screen">

      {/* Navigation */}export default function Home() {  return (

      <nav className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  return (    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

          <div className="flex justify-between h-16">

            <div className="flex items-center">    <div className="min-h-screen">      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

              <CloudIcon className="h-8 w-8 text-blue-600" />

              <span className="ml-2 text-xl font-bold text-gray-900">IPFS Cloud</span>      {/* Navigation */}        <Image

            </div>

            <div className="flex items-center space-x-4">      <nav className="bg-white shadow-sm border-b">          className="dark:invert"

              <Link href="/auth/login" className="text-gray-500 hover:text-gray-700">

                Sign In        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          src="/next.svg"

              </Link>

              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">          <div className="flex justify-between h-16">          alt="Next.js logo"

                Get Started

              </Link>            <div className="flex items-center">          width={180}

            </div>

          </div>              <CloudIcon className="h-8 w-8 text-blue-600" />          height={38}

        </div>

      </nav>              <span className="ml-2 text-xl font-bold text-gray-900">IPFS Cloud</span>          priority



      {/* Hero Section */}            </div>        />

      <div className="bg-white">

        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">            <div className="flex items-center space-x-4">        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">

          <div className="text-center">

            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">              <Link href="/auth/login" className="text-gray-500 hover:text-gray-700">          <li className="mb-2 tracking-[-.01em]">

              <span className="block">IPFS Storage Made</span>

              <span className="block text-blue-600">Simple & Scalable</span>                Sign In            Get started by editing{" "}

            </h1>

            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">              </Link>            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">

              Upload, manage, and distribute your files on IPFS with our developer-friendly platform. 

              Get started with generous free tier limits.              <Link href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">              src/app/page.tsx

            </p>

            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">                Get Started            </code>

              <div className="rounded-md shadow">

                <Link href="/auth/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">              </Link>            .

                  Start Building

                </Link>            </div>          </li>

              </div>

              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">          </div>          <li className="tracking-[-.01em]">

                <Link href="/docs" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">

                  View Docs        </div>            Save and see your changes instantly.

                </Link>

              </div>      </nav>          </li>

            </div>

          </div>        </ol>

        </div>

      </div>      {/* Hero Section */}



      {/* Features Section */}      <div className="bg-white">        <div className="flex gap-4 items-center flex-col sm:flex-row">

      <div className="py-12 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">          <a

          <div className="lg:text-center">

            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>          <div className="text-center">            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"

            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">

              Everything you need to build with IPFS            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"

            </p>

          </div>              <span className="block">IPFS Storage Made</span>            target="_blank"



          <div className="mt-10">              <span className="block text-blue-600">Simple & Scalable</span>            rel="noopener noreferrer"

            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

              <div className="relative">            </h1>          >

                <dt>

                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">            <Image

                    <CloudIcon className="h-6 w-6" aria-hidden="true" />

                  </div>              Upload, manage, and distribute your files on IPFS with our developer-friendly platform.               className="dark:invert"

                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy File Management</p>

                </dt>              Get started with generous free tier limits.              src="/vercel.svg"

                <dd className="mt-2 ml-16 text-base text-gray-500">

                  Upload, organize, and manage your files with our intuitive dashboard. Support for all file types.            </p>              alt="Vercel logomark"

                </dd>

              </div>            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">              width={20}



              <div className="relative">              <div className="rounded-md shadow">              height={20}

                <dt>

                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">                <Link href="/auth/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">            />

                    <KeyIcon className="h-6 w-6" aria-hidden="true" />

                  </div>                  Start Building            Deploy now

                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">API Key Management</p>

                </dt>                </Link>          </a>

                <dd className="mt-2 ml-16 text-base text-gray-500">

                  Generate and manage API keys for seamless integration with your applications.              </div>          <a

                </dd>

              </div>              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"



              <div className="relative">                <Link href="/docs" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"

                <dt>

                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">                  View Docs            target="_blank"

                    <ChartBarIcon className="h-6 w-6" aria-hidden="true" />

                  </div>                </Link>            rel="noopener noreferrer"

                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Usage Analytics</p>

                </dt>              </div>          >

                <dd className="mt-2 ml-16 text-base text-gray-500">

                  Track your storage usage, bandwidth, and API requests with detailed analytics.            </div>            Read our docs

                </dd>

              </div>          </div>          </a>



              <div className="relative">        </div>        </div>

                <dt>

                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">      </div>      </main>

                    <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />

                  </div>      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure & Reliable</p>

                </dt>      {/* Features Section */}        <a

                <dd className="mt-2 ml-16 text-base text-gray-500">

                  Your data is secured with enterprise-grade security and replicated across the IPFS network.      <div className="py-12 bg-gray-50">          className="flex items-center gap-2 hover:underline hover:underline-offset-4"

                </dd>

              </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"

            </div>

          </div>          <div className="lg:text-center">          target="_blank"

        </div>

      </div>            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>          rel="noopener noreferrer"



      {/* Pricing Section */}            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">        >

      <div className="bg-white py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">              Everything you need to build with IPFS          <Image

          <div className="lg:text-center">

            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Pricing</h2>            </p>            aria-hidden

            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">

              Simple, transparent pricing          </div>            src="/file.svg"

            </p>

          </div>            alt="File icon"



          <div className="mt-10 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">          <div className="mt-10">            width={16}

            {/* Free Tier */}

            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">            height={16}

              <div className="p-6">

                <h2 className="text-lg leading-6 font-medium text-gray-900">Free</h2>              <div className="relative">          />

                <p className="mt-4 text-sm text-gray-500">Perfect for getting started</p>

                <p className="mt-8">                <dt>          Learn

                  <span className="text-4xl font-extrabold text-gray-900">$0</span>

                  <span className="text-base font-medium text-gray-500">/month</span>                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">        </a>

                </p>

                <Link href="/auth/signup" className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">                    <CloudIcon className="h-6 w-6" aria-hidden="true" />        <a

                  Get Started

                </Link>                  </div>          className="flex items-center gap-2 hover:underline hover:underline-offset-4"

              </div>

              <div className="pt-6 pb-8 px-6">                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Easy File Management</p>          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"

                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What&apos;s included</h3>

                <ul role="list" className="mt-6 space-y-4">                </dt>          target="_blank"

                  <li className="flex space-x-3">

                    <span className="text-sm text-gray-500">1 GB Storage</span>                <dd className="mt-2 ml-16 text-base text-gray-500">          rel="noopener noreferrer"

                  </li>

                  <li className="flex space-x-3">                  Upload, organize, and manage your files with our intuitive dashboard. Support for all file types.        >

                    <span className="text-sm text-gray-500">10 GB Bandwidth/month</span>

                  </li>                </dd>          <Image

                  <li className="flex space-x-3">

                    <span className="text-sm text-gray-500">1,000 API Requests/month</span>              </div>            aria-hidden

                  </li>

                </ul>            src="/window.svg"

              </div>

            </div>              <div className="relative">            alt="Window icon"



            {/* Premium Tier */}                <dt>            width={16}

            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">

              <div className="p-6">                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">            height={16}

                <h2 className="text-lg leading-6 font-medium text-gray-900">Premium</h2>

                <p className="mt-4 text-sm text-gray-500">For production applications</p>                    <KeyIcon className="h-6 w-6" aria-hidden="true" />          />

                <p className="mt-8">

                  <span className="text-4xl font-extrabold text-gray-900">$20</span>                  </div>          Examples

                  <span className="text-base font-medium text-gray-500">/month</span>

                </p>                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">API Key Management</p>        </a>

                <Link href="/auth/signup" className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700">

                  Upgrade                </dt>        <a

                </Link>

              </div>                <dd className="mt-2 ml-16 text-base text-gray-500">          className="flex items-center gap-2 hover:underline hover:underline-offset-4"

              <div className="pt-6 pb-8 px-6">

                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What&apos;s included</h3>                  Generate and manage API keys for seamless integration with your applications.          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"

                <ul role="list" className="mt-6 space-y-4">

                  <li className="flex space-x-3">                </dd>          target="_blank"

                    <span className="text-sm text-gray-500">100 GB Storage</span>

                  </li>              </div>          rel="noopener noreferrer"

                  <li className="flex space-x-3">

                    <span className="text-sm text-gray-500">1 TB Bandwidth/month</span>        >

                  </li>

                  <li className="flex space-x-3">              <div className="relative">          <Image

                    <span className="text-sm text-gray-500">Unlimited API Requests</span>

                  </li>                <dt>            aria-hidden

                  <li className="flex space-x-3">

                    <span className="text-sm text-gray-500">Priority Support</span>                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">            src="/globe.svg"

                  </li>

                </ul>                    <ChartBarIcon className="h-6 w-6" aria-hidden="true" />            alt="Globe icon"

              </div>

            </div>                  </div>            width={16}

          </div>

        </div>                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Usage Analytics</p>            height={16}

      </div>

                </dt>          />

      {/* Footer */}

      <footer className="bg-gray-800">                <dd className="mt-2 ml-16 text-base text-gray-500">          Go to nextjs.org →

        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center">                  Track your storage usage, bandwidth, and API requests with detailed analytics.        </a>

            <div className="flex items-center">

              <CloudIcon className="h-8 w-8 text-white" />                </dd>      </footer>

              <span className="ml-2 text-xl font-bold text-white">IPFS Cloud</span>

            </div>              </div>    </div>

            <p className="text-gray-400 text-sm">

              © 2025 IPFS Cloud. Built for developers, by developers.  );

            </p>

          </div>              <div className="relative">}

        </div>

      </footer>                <dt>

    </div>                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">

  )                    <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />

}                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure & Reliable</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Your data is secured with enterprise-grade security and replicated across the IPFS network.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Pricing</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </p>
          </div>

          <div className="mt-10 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
            {/* Free Tier */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Free</h2>
                <p className="mt-4 text-sm text-gray-500">Perfect for getting started</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <Link href="/auth/signup" className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">
                  Get Started
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What&apos;s included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">1 GB Storage</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">10 GB Bandwidth/month</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">1,000 API Requests/month</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Premium</h2>
                <p className="mt-4 text-sm text-gray-500">For production applications</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$20</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <Link href="/auth/signup" className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700">
                  Upgrade
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What&apos;s included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">100 GB Storage</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">1 TB Bandwidth/month</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Unlimited API Requests</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Priority Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CloudIcon className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">IPFS Cloud</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 IPFS Cloud. Built for developers, by developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}