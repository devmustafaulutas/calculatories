import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Calculatories",
  description:
    "Learn how Calculatories protects your privacy. Read our privacy policy to understand how we handle your data.",
  alternates: {
    canonical: "https://calculatories.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: January 1, 2024
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            At Calculatories, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, and protect your information
            when you use our website and calculators.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>
            When you use our calculators, you may enter personal information
            such as financial figures, health metrics, or other data. This
            information is processed entirely in your web browser and is not
            transmitted to our servers. We do not collect, store, or have access
            to the data you enter into our calculators.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>We may automatically collect certain information, including:</p>
          <ul>
            <li>
              Browser type and version
            </li>
            <li>
              Device type and operating system
            </li>
            <li>
              Pages visited and time spent on pages
            </li>
            <li>
              Referral source
            </li>
            <li>
              General geographic location (country/region level)
            </li>
          </ul>

          <h2>How We Use Information</h2>
          <p>We use the automatically collected information to:</p>
          <ul>
            <li>Improve our calculators and website functionality</li>
            <li>Analyze usage patterns and trends</li>
            <li>Diagnose technical issues</li>
            <li>Optimize user experience</li>
          </ul>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience
            on our website. These may include:
          </p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for the website to
              function properly
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand how
              visitors use our site
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used to deliver relevant
              advertisements
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Note that
            disabling cookies may affect website functionality.
          </p>

          <h2>Third-Party Services</h2>
          <p>We may use third-party services that collect information:</p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> For website analytics
            </li>
            <li>
              <strong>Google AdSense:</strong> For displaying advertisements
            </li>
          </ul>
          <p>
            These services have their own privacy policies governing how they
            use and protect your information.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your
            information. However, no method of transmission over the Internet is
            100% secure. We cannot guarantee absolute security of any
            information transmitted to or from our website.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13. If you believe we have collected information from a child under
            13, please contact us immediately.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of certain data collection practices</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at{" "}
            <a
              href="mailto:privacy@calculatories.com"
              className="text-primary hover:underline"
            >
              privacy@calculatories.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
