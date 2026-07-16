"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Cpu, Globe, Map } from "lucide-react";
import Link from "next/link";
import services from "@/data/serviceData";

const MOBILE_BREAKPOINT = 768;

const iconMap = { Camera, Cpu, Globe, Map };

const ParticleCard = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
  service
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseMove = e => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = e => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('click', handleClick);
    };
  }, [disableAnimations, enableTilt, enableMagnetism, clickEffect]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      role="article"
      aria-label={`Service card for ${service.title}`}
    >
      {children}
    </div>
  );
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div
    className="grid grid-cols-1 md:grid-cols-4 gap-6 bento-section p-6"
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const ProductsAndServicesPage = () => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = isMobile;

  return (
    <div id="services" className="w-full py-20 px-6 md:px-10 bg-muted/30 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <Badge
          className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
          variant="secondary"
        >
          Services
        </Badge>
        <h1 className="text-2xl md:text-3xl font-semibold">
          Smart Solutions
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
          Discover our innovative solutions designed to elevate your business with cutting-edge technology.
        </p>
      </motion.div>

      <BentoCardGrid gridRef={gridRef}>
        {services.map((service) => {
          const IconComponent = iconMap[service.icon] || Camera;
          return (
            <ParticleCard
              key={service.title}
              className="card w-full"
              style={{ backgroundColor: service.color }}
              disableAnimations={shouldDisableAnimations}
              enableTilt={true}
              clickEffect={true}
              enableMagnetism={true}
              service={service}
            >
              <div className="card__header p-4">
                <div className="card__label text-sm text-primary font-medium">{service.label}</div>
              </div>
              <div className="card__content p-4 flex flex-col items-start">
                <IconComponent className="size-12 text-primary mb-3" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-muted-foreground text-base">{service.description}</p>
                <Button asChild className="mt-4 self-end" variant="outline">
                  <Link href={`/services/${service.slug}`}>Read More</Link>
                </Button>
              </div>
            </ParticleCard>
          );
        })}
      </BentoCardGrid>

      {/* Get Started Section with Full-Width Box */}
      <motion.div
        className="w-full bg-muted/50  py-10 mt-10  rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-xl">
            Ready to elevate your project? Get started with our services today!
          </p>
          <Link href="/contact">
            <Button
              variant="default"
              className="text-sm px-6 py-2 bg-primary text-black hover:bg-primary/90"
              aria-label="Get started with our services"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsAndServicesPage;