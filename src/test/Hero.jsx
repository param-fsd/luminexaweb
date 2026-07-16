import React from "react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import SplitText from "./animations/SplitText";
import Navbar from "./Navbar";
import LightRays from "./animations/LightRays";

const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set initial state based on current scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full overflow-hidden relative">
      <div className="px-4 md:px-6">
        {/* LightRays background */}
        <div
          className="absolute inset-0 h-[1500px] w-full -z-10"
          style={{ width: "100%", height: "1500px", position: "absolute" }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#fdfdfdff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* Navbar */}
        <div className="mb-15">
          <Navbar isScrolled={isScrolled} mounted={mounted} />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-5xl mx-auto mb-12 relative z-10"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-5">
            <Badge
              className="mb-2 rounded-full px-4 py-1 text-sm font-medium bg-transparent border border-secondary"
              variant="secondary"
            >
              <span className="text-sm">AR</span>
            </Badge>
            <Badge
              className="mb-2 rounded-full px-4 py-1 text-sm font-medium bg-transparent border border-secondary"
              variant="secondary"
            >
              <span className="text-sm">Custom WebApps</span>
            </Badge>
            <Badge
              className="mb-2 rounded-full px-4 py-1 text-sm font-medium bg-transparent border border-secondary"
              variant="secondary"
            >
              <span className="text-sm">360 Virtual Tour</span>
            </Badge>
            <Badge
              className="mb-2 rounded-full px-4 py-1 text-sm font-medium bg-transparent border border-secondary"
              variant="secondary"
            >
              <span className="text-sm">AI</span>
            </Badge>
            <Badge
              className="mb-2 rounded-full px-4 py-1 text-sm font-medium bg-transparent border border-secondary"
              variant="secondary"
            >
              <span className="text-sm">Image Mapping</span>
            </Badge>
          </div>
          <SplitText
            text="Experience the Future Built by Luminexa"
            className="text-4xl md:text-5xl lg:text-6xl tracking-normal mb-6 bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 w-full"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-100px"
            textAlign="center"
          />
          <p className="text-sm md:text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
            Luminexa helps you collaborate, automate, and scale — with powerful
            AR, AI, and custom apps built for results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="sm"
              className="rounded-full h-12 px-8 text-base cursor-pointer group"
            >
              <span className="text-base">
                Why <strong>nex?</strong>
              </span>
              <ArrowRight className="group-hover:translate-x-1 transition-all ease-in-out duration-200 size-4 ml-2" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full h-12 px-8 text-base cursor-pointer"
            >
              <span className="text-base">Book a Demo</span>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span className="text-sm">Custom-Built for Your Brand</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span className="text-sm">End-to-End Solutions</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span className="text-sm">Scalable Across All Platforms</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto max-w-5xl relative z-10"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
            <video
              src="https://cdn.glitch.global/62dd5357-cabd-4363-bf7a-61c739629aa4/Untitled%20video%20-%20Made%20with%20Clipchamp%20(18).mp4?v=1751383115509"
              width={1280}
              height={720}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10"></div>
          </div>
          <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
          <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;