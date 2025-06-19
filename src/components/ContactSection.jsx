
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, ExternalLink, Phone, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactSection = ({ contact, theme }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Show success toast
    toast({
      title: "Email client opened!",
      description: "Your message has been prepared in Gmail. Please send it from there.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: theme.primaryColor
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'LinkedIn Profile',
      href: contact.linkedin,
      color: '#0077B5'
    },
    {
      icon: ExternalLink,
      label: 'ArtStation',
      value: 'ArtStation Portfolio',
      href: contact.artstation,
      color: '#13AFF0'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone}`,
      color: theme.secondaryColor
    }
  ];

  return (
    <section id="contact" className="py-20 lg:ml-64 section-bg-1">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl lg:text-6xl font-bold mb-6"
            style={{ color: theme.primaryColor }}
          >
            Contact Me
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full progress-line mb-8"
          />
          <p 
            className="text-xl opacity-80 max-w-2xl mx-auto"
            style={{ color: theme.highValue }}
          >
            Let's collaborate and bring your creative vision to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: theme.primaryColor }}
              >
                Send a Message
              </h3>
              <p 
                className="opacity-80"
                style={{ color: theme.highValue }}
              >
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.highValue }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border-0 focus:ring-2 focus:ring-red-500 transition-all duration-300"
                    style={{ 
                      backgroundColor: `${theme.primaryColor}10`,
                      color: theme.highValue 
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.highValue }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass-effect border-0 focus:ring-2 focus:ring-red-500 transition-all duration-300"
                    style={{ 
                      backgroundColor: `${theme.primaryColor}10`,
                      color: theme.highValue 
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.highValue }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass-effect border-0 focus:ring-2 focus:ring-red-500 transition-all duration-300"
                  style={{ 
                    backgroundColor: `${theme.primaryColor}10`,
                    color: theme.highValue 
                  }}
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.highValue }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg glass-effect border-0 focus:ring-2 focus:ring-red-500 transition-all duration-300 resize-none"
                  style={{ 
                    backgroundColor: `${theme.primaryColor}10`,
                    color: theme.highValue 
                  }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: theme.primaryColor,
                  color: theme.lowValue 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: theme.primaryColor }}
              >
                Get in Touch
              </h3>
              <p 
                className="opacity-80"
                style={{ color: theme.highValue }}
              >
                Connect with me through any of these platforms.
              </p>
            </div>

            <div className="space-y-6">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-6 glass-effect rounded-xl hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${link.color}20` }}
                  >
                    <link.icon 
                      className="w-6 h-6"
                      style={{ color: link.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="font-medium"
                      style={{ color: theme.highValue }}
                    >
                      {link.label}
                    </h4>
                    <p 
                      className="text-sm opacity-70"
                      style={{ color: theme.highValue }}
                    >
                      {link.value}
                    </p>
                  </div>
                  <ExternalLink 
                    className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ color: theme.highValue }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              className="relative mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-full h-32 rounded-2xl relative overflow-hidden"
                style={{ backgroundColor: `${theme.primaryColor}10` }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: [-100, 400] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p 
                    className="text-lg font-medium opacity-80"
                    style={{ color: theme.highValue }}
                  >
                    Ready to start your project?
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
