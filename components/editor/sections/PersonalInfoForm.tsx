"use client";

/**
 * Formulario de Información Personal
 * 
 * Permite editar:
 * - Nombre completo
 * - Email
 * - Teléfono
 * - Ubicación
 * - Redes sociales (website, LinkedIn, GitHub)
 * - Resumen profesional
 */

import { useState, useEffect } from "react";
import { PersonalInfo } from "@/types/cv";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  summary: string;
  onUpdate: (personalInfo: PersonalInfo, summary: string) => void;
}

export default function PersonalInfoForm({
  data,
  summary,
  onUpdate,
}: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    location: data.location || "",
    website: data.website || "",
    linkedin: data.linkedin || "",
    github: data.github || "",
  });
  const [summaryText, setSummaryText] = useState(summary || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Actualizar cuando cambian los datos iniciales
  useEffect(() => {
    setFormData({
      fullName: data.fullName || "",
      email: data.email || "",
      phone: data.phone || "",
      location: data.location || "",
      website: data.website || "",
      linkedin: data.linkedin || "",
      github: data.github || "",
    });
    setSummaryText(summary || "");
  }, [data, summary]);

  // Validar email
  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar URL
  const validateURL = (url: string): boolean => {
    if (!url) return true; // Opcional
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  // Manejar cambios en los campos
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validaciones en tiempo real
    const newErrors: Record<string, string> = { ...errors };

    if (field === "email" && value && !validateEmail(value)) {
      newErrors.email = "Email inválido";
    } else if (field === "email") {
      delete newErrors.email;
    }

    if ((field === "website" || field === "linkedin" || field === "github") && value && !validateURL(value)) {
      newErrors[field] = "URL inválida";
    } else if (field === "website" || field === "linkedin" || field === "github") {
      delete newErrors[field];
    }

    setErrors(newErrors);

    // Actualizar datos del CV
    const updatedPersonalInfo: PersonalInfo = {
      ...formData,
      [field]: value,
    };

    onUpdate(updatedPersonalInfo, summaryText);
  };

  const handleSummaryChange = (value: string) => {
    setSummaryText(value);
    onUpdate(formData, value);
  };

  return (
    <div className="space-y-4">
      {/* Nombre completo */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Nombre Completo *
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Juan Pérez"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="juan@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Teléfono
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+34 600 000 000"
        />
      </div>

      {/* Ubicación */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ubicación
        </label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Madrid, España"
        />
      </div>

      {/* Website */}
      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Sitio Web
        </label>
        <input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => handleChange("website", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.website
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="https://miweb.com"
        />
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website}</p>
        )}
      </div>

      {/* LinkedIn */}
      <div>
        <label
          htmlFor="linkedin"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          LinkedIn
        </label>
        <input
          id="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.linkedin
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="https://linkedin.com/in/usuario"
        />
        {errors.linkedin && (
          <p className="mt-1 text-sm text-red-600">{errors.linkedin}</p>
        )}
      </div>

      {/* GitHub */}
      <div>
        <label
          htmlFor="github"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          GitHub
        </label>
        <input
          id="github"
          type="url"
          value={formData.github}
          onChange={(e) => handleChange("github", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.github
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="https://github.com/usuario"
        />
        {errors.github && (
          <p className="mt-1 text-sm text-red-600">{errors.github}</p>
        )}
      </div>

      {/* Resumen Profesional */}
      <div>
        <label
          htmlFor="summary"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Resumen Profesional
        </label>
        <textarea
          id="summary"
          value={summaryText}
          onChange={(e) => handleSummaryChange(e.target.value)}
          rows={4}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe un breve resumen de tu experiencia profesional..."
        />
        <p className="mt-1 text-xs text-gray-500">
          {summaryText.length}/500 caracteres
        </p>
      </div>
    </div>
  );
}



