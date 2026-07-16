"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Globe, Map, Palette, Cpu } from "lucide-react";

const productsAndServices = [
  {
    name: "nexAR",
    description: "Advanced augmented reality solutions for immersive experiences.",
    features: ["Image Tracking", "Tap to Place", "Multi Image Tracking"],
    icon: Camera,
  },
  {
    name: "nexNet",
    description: "Robust networking and custom web application development.",
    features: ["Image Mapping", "Custom Webapps", "Frontend", "Backend", "Custom App Development", "AI Integrated Web Applications"],
    icon: Globe,
  },
  {
    name: "Nex3D",
    description: "Cutting-edge 3D visualization and virtual tour creation.",
    features: ["Virtual Tour Drone", "3D Rendered Virtual Tour", "3D Tour", "AI Integrated 3D Tour", "AI Integrated Custom Applicatio"],
    icon: Map,
  },
  {
    name: "nexDes",
    description: "Creative graphic design and animation services.",
    features: ["Graphic Designing", "Animation", "3D Walkthrough", "Still View 3D Rendered"],
    icon: Palette,
  }
];

const ProductsAndServicesPage = () => {
  return (
    <div className="w-full py-20 px-6 md:px-10 bg-muted/30 dark:bg-black">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight">Our Products & Services</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Discover our innovative solutions designed to elevate your business with cutting-edge technology.
        </p>
        <Button className="mt-6 px-6 py-2 text-base cursor-pointer">
          Get Started
        </Button>
      </motion.div>

      {/* Products and Services Section */}
      <div className="grid gap-6 lg:grid-cols-4">
        {productsAndServices.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 flex flex-col items-center text-center bg-background dark:bg-muted/10">
              <product.icon className="size-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-muted-foreground mt-2">{product.description}</p>
              <ul className="text-muted-foreground text-sm mt-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>

      
    </div>
  );
};

export default ProductsAndServicesPage;