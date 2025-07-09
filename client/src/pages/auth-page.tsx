
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, User, Lock, Users, Building2, Sparkles, Shield } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    name: "",
    area: "" as any,
    adminPassword: "",
  });

  if (user) {
    return <Redirect to="/" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8bbed] via-white to-[#de8fd9] flex items-center justify-center p-6">
      {/* Floating shapes for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#504b78] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#8c69a5] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 bg-[#233154] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Branding and features */}
          <div className="hidden md:block space-y-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-6">
                <img
                  src="./../../public/LogoJASANA.png"
                  alt="JASANA Logo"
                  className="w-16 h-16 object-contain"
                  draggable={false}
                />
              </div>
              
              <div>
                <h1 className="text-5xl font-bold text-[#233154] mb-4">
                  JASANA
                </h1>
                <p className="text-xl text-[#504b78] font-medium">
                  Sistema de Gestión de Pedidos
                </p>
                <p className="text-lg text-gray-600 mt-2">
                  Controla el flujo completo desde Corte hasta Envíos
                </p>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Building2,
                  title: "7 Áreas Integradas",
                  desc: "Corte, Bordado, Ensamble, Plancha, Calidad, Envíos y Admin",
                  gradient: "from-[#de8fd9] to-[#8c69a5]"
                },
                {
                  icon: Users,
                  title: "Transferencias Inteligentes",
                  desc: "Control preciso de piezas entre áreas de trabajo",
                  gradient: "from-[#8c69a5] to-[#504b78]"
                },
                {
                  icon: Sparkles,
                  title: "Historial Completo",
                  desc: "Seguimiento detallado de cada pedido en tiempo real",
                  gradient: "from-[#504b78] to-[#233154]"
                },
                {
                  icon: Shield,
                  title: "Sistema Seguro",
                  desc: "Notificaciones y validaciones para mayor control",
                  gradient: "from-[#233154] to-[#f8bbed]"
                },
              ].map(({ icon: Icon, title, desc, gradient }) => (
                <div
                  key={title}
                  className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="font-bold text-sm mb-2">{title}</h3>
                  <p className="text-xs opacity-90 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Card className="backdrop-blur-lg bg-white/90 shadow-2xl border-0 rounded-3xl overflow-hidden">
                <CardHeader className="text-center pb-2 bg-gradient-to-r from-[#504b78] to-[#8c69a5] text-white">
                  <div className="flex justify-center mb-4 md:hidden">
                    <img
                      src="./../../public/LogoJASANA.png"
                      alt="JASANA Logo"
                      className="w-16 h-16 object-contain"
                      draggable={false}
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Bienvenido
                  </CardTitle>
                  <p className="text-white/80 text-sm">
                    Accede a tu cuenta JASANA
                  </p>
                </CardHeader>
                
                <CardContent className="p-8">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid grid-cols-2 rounded-2xl bg-gray-100 shadow-inner mb-8 h-12">
                      <TabsTrigger
                        value="login"
                        className="text-gray-700 font-semibold rounded-xl data-[state=active]:bg-[#504b78] data-[state=active]:text-white transition-all duration-300"
                      >
                        Iniciar Sesión
                      </TabsTrigger>
                      <TabsTrigger
                        value="register"
                        className="text-gray-700 font-semibold rounded-xl data-[state=active]:bg-[#504b78] data-[state=active]:text-white transition-all duration-300"
                      >
                        Registrarse
                      </TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <TabsContent value="login" className="space-y-6">
                      <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="login-username" className="text-[#233154] font-semibold flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Usuario
                          </Label>
                          <Input
                            id="login-username"
                            type="text"
                            value={loginData.username}
                            onChange={(e) =>
                              setLoginData({ ...loginData, username: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-colors"
                            placeholder="Ingrese su usuario"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="login-password" className="text-[#233154] font-semibold flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Contraseña
                          </Label>
                          <Input
                            id="login-password"
                            type="password"
                            value={loginData.password}
                            onChange={(e) =>
                              setLoginData({ ...loginData, password: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-colors"
                            placeholder="Ingrese su contraseña"
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-[#504b78] to-[#8c69a5] hover:from-[#8c69a5] hover:to-[#504b78] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <User className="mr-2 h-5 w-5" />
                          )}
                          Iniciar Sesión
                        </Button>
                      </form>
                    </TabsContent>

                    {/* Register Form */}
                    <TabsContent value="register" className="space-y-4">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-username" className="text-[#233154] font-semibold flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Usuario
                          </Label>
                          <Input
                            id="register-username"
                            type="text"
                            value={registerData.username}
                            onChange={(e) =>
                              setRegisterData({ ...registerData, username: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-colors"
                            placeholder="Ingrese su usuario"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-password" className="text-[#233154] font-semibold flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Contraseña
                          </Label>
                          <Input
                            id="register-password"
                            type="password"
                            value={registerData.password}
                            onChange={(e) =>
                              setRegisterData({ ...registerData, password: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-colors"
                            placeholder="Ingrese su contraseña"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-name" className="text-[#233154] font-semibold flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Nombre Completo
                          </Label>
                          <Input
                            id="register-name"
                            type="text"
                            value={registerData.name}
                            onChange={(e) =>
                              setRegisterData({ ...registerData, name: e.target.value })
                            }
                            required
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-colors"
                            placeholder="Ingrese su nombre completo"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="register-area" className="text-[#233154] font-semibold flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Área
                          </Label>
                          <Select
                            value={registerData.area}
                            onValueChange={(value) =>
                              setRegisterData({ ...registerData, area: value as any })
                            }
                          >
                            <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78]">
                              <SelectValue placeholder="Seleccionar área" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="corte">Corte</SelectItem>
                              <SelectItem value="bordado">Bordado</SelectItem>
                              <SelectItem value="ensamble">Ensamble</SelectItem>
                              <SelectItem value="plancha">Plancha/Empaque</SelectItem>
                              <SelectItem value="calidad">Calidad</SelectItem>
                              <SelectItem value="envios">Envíos</SelectItem>
                              <SelectItem value="patronaje">Patronaje</SelectItem>
                              <SelectItem value="almacen">Almacén</SelectItem>
                              <SelectItem value="diseño">Diseño</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {registerData.area !== "admin" && (
                          <div className="space-y-2">
                            <Label htmlFor="admin-password" className="text-[#233154] font-semibold flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Contraseña de Admin
                            </Label>
                            <Input
                              id="admin-password"
                              type="password"
                              value={registerData.adminPassword}
                              onChange={(e) =>
                                setRegisterData({ ...registerData, adminPassword: e.target.value })
                              }
                              required
                              placeholder="Requerida para registrarse"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-colors"
                            />
                          </div>
                        )}
                        
                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-[#504b78] to-[#8c69a5] hover:from-[#8c69a5] hover:to-[#504b78] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mt-6"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <Users className="mr-2 h-5 w-5" />
                          )}
                          Registrarse
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
