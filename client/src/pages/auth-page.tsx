
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, User, Lock, Users, Building2, Shield, RotateCcw, MessageSquare, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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

  const toggleMode = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsRegisterMode(!isRegisterMode);
      setTimeout(() => setIsFlipping(false), 300);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8bbed] via-white to-[#de8fd9] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#504b78] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#8c69a5] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="absolute -bottom-32 left-1/2 w-80 h-80 bg-[#233154] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/LogoJASANA.png"
              alt="JASANA Logo"
              className="w-16 h-16 object-contain"
              draggable={false}
            />
          </div>
          <h1 className="text-5xl font-bold text-[#233154] mb-3 tracking-tight">JASANA</h1>
          <p className="text-[#504b78] font-medium text-lg">Sistema de Gestión de Pedidos</p>
        </div>

        {/* Card container with flip animation */}
        <div className="relative perspective-1000">
          <div 
            className={`relative transform-style-preserve-3d transition-transform duration-700 ease-in-out ${
              isFlipping ? 'rotate-y-180' : ''
            }`}
          >
            <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0 rounded-3xl overflow-hidden relative">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#504b78] via-[#8c69a5] to-[#504b78] rounded-3xl p-[2px]">
                <div className="w-full h-full bg-white/95 rounded-3xl"></div>
              </div>
              
              <div className="relative z-10">
                {/* Header with animated gradient */}
                <CardHeader className="text-center pb-8 pt-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#504b78] via-[#8c69a5] to-[#504b78] opacity-10"></div>
                  <div className="relative z-10">
                    <CardTitle className="text-3xl font-bold mb-3 text-[#233154] flex items-center justify-center gap-3">
                      {isRegisterMode ? (
                        <>
                          <Users className="w-8 h-8" />
                          Crear Cuenta
                        </>
                      ) : (
                        <>
                          <User className="w-8 h-8" />
                          Iniciar Sesión
                        </>
                      )}
                    </CardTitle>
                    <p className="text-[#504b78] text-base">
                      {isRegisterMode 
                        ? "Complete los datos para registrarse" 
                        : "Ingrese sus credenciales para acceder"
                      }
                    </p>
                  </div>
                </CardHeader>

                {/* Content with improved layout */}
                <CardContent className="p-8 pt-0">
                  <div className="relative overflow-hidden">
                    {/* Login Form */}
                    <div 
                      className={`transition-all duration-500 ease-in-out ${
                        isRegisterMode 
                          ? 'transform translate-x-full opacity-0 absolute inset-0 pointer-events-none' 
                          : 'transform translate-x-0 opacity-100'
                      }`}
                    >
                      <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="login-username" className="text-[#233154] font-semibold flex items-center gap-2 text-base">
                            <User className="w-5 h-5" />
                            Usuario
                          </Label>
                          <Input
                            id="login-username"
                            type="text"
                            value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            required
                            className="h-14 rounded-2xl border-2 border-gray-200 focus:border-[#504b78] transition-all duration-300 text-lg px-6 bg-white/50 backdrop-blur-sm"
                            placeholder="Ingrese su usuario"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="login-password" className="text-[#233154] font-semibold flex items-center gap-2 text-base">
                            <Lock className="w-5 h-5" />
                            Contraseña
                          </Label>
                          <Input
                            id="login-password"
                            type="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                            className="h-14 rounded-2xl border-2 border-gray-200 focus:border-[#504b78] transition-all duration-300 text-lg px-6 bg-white/50 backdrop-blur-sm"
                            placeholder="Ingrese su contraseña"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-14 bg-gradient-to-r from-[#504b78] to-[#8c69a5] hover:from-[#8c69a5] hover:to-[#504b78] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-lg"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          ) : (
                            <User className="mr-3 h-6 w-6" />
                          )}
                          Iniciar Sesión
                        </Button>

                        <div className="text-center mt-4">
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-[#504b78] hover:text-[#8c69a5] font-medium transition-colors duration-300 text-sm underline"
                          >
                            ¿Olvidaste tu contraseña?
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Register Form */}
                    <div 
                      className={`transition-all duration-500 ease-in-out ${
                        isRegisterMode 
                          ? 'transform translate-x-0 opacity-100' 
                          : 'transform -translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                      }`}
                    >
                      <form onSubmit={handleRegister} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="register-username" className="text-[#233154] font-semibold flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Usuario
                            </Label>
                            <Input
                              id="register-username"
                              type="text"
                              value={registerData.username}
                              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                              required
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                              placeholder="Usuario"
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
                              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                              required
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                              placeholder="Contraseña"
                            />
                          </div>
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
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            required
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] transition-all duration-300 bg-white/50 backdrop-blur-sm"
                            placeholder="Ingrese su nombre completo"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-area" className="text-[#233154] font-semibold flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Área de Trabajo
                          </Label>
                          <Select
                            value={registerData.area}
                            onValueChange={(value) => setRegisterData({ ...registerData, area: value as any })}
                          >
                            <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#504b78] bg-white/50 backdrop-blur-sm">
                              <SelectValue placeholder="Seleccionar área" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white/95 backdrop-blur-lg">
                              <SelectItem value="corte">✂️ Corte</SelectItem>
                              <SelectItem value="bordado">🪡 Bordado</SelectItem>
                              <SelectItem value="ensamble">🔧 Ensamble</SelectItem>
                              <SelectItem value="plancha">👔 Plancha/Empaque</SelectItem>
                              <SelectItem value="calidad">✅ Calidad</SelectItem>
                              <SelectItem value="envios">📦 Envíos</SelectItem>
                              <SelectItem value="patronaje">📐 Patronaje</SelectItem>
                              <SelectItem value="almacen">🏪 Almacén</SelectItem>
                              <SelectItem value="diseño">🎨 Diseño</SelectItem>
                              <SelectItem value="admin">⚙️ Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {registerData.area && registerData.area !== "admin" && (
                          <div className="space-y-2 animate-in slide-in-from-top duration-300">
                            <Label htmlFor="admin-password" className="text-[#233154] font-semibold flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Contraseña de Admin
                            </Label>
                            <Input
                              id="admin-password"
                              type="password"
                              value={registerData.adminPassword}
                              onChange={(e) => setRegisterData({ ...registerData, adminPassword: e.target.value })}
                              required
                              placeholder="Requerida para registrarse"
                              className="h-12 rounded-xl border-2 border-red-200 focus:border-red-400 transition-all duration-300 bg-red-50/50 backdrop-blur-sm"
                            />
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full h-14 bg-gradient-to-r from-[#504b78] to-[#8c69a5] hover:from-[#8c69a5] hover:to-[#504b78] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-lg"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          ) : (
                            <Users className="mr-3 h-6 w-6" />
                          )}
                          Crear Cuenta
                        </Button>
                      </form>
                    </div>
                  </div>

                  {/* Toggle button with flip animation */}
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="group flex items-center gap-3 mx-auto text-[#504b78] hover:text-[#8c69a5] font-medium transition-all duration-300 px-6 py-3 rounded-xl hover:bg-white/50 backdrop-blur-sm"
                      disabled={isFlipping}
                    >
                      <RotateCcw className={`w-5 h-5 transition-transform duration-700 ${isFlipping ? 'rotate-180' : ''} group-hover:rotate-12`} />
                      {isRegisterMode 
                        ? "¿Ya tienes cuenta? Inicia sesión" 
                        : "¿No tienes cuenta? Regístrate"
                      }
                    </button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="max-w-md rounded-3xl bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#504b78] via-[#8c69a5] to-[#504b78] rounded-3xl p-[2px]">
            <div className="w-full h-full bg-white/95 rounded-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <DialogHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#504b78] to-[#8c69a5] rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-[#233154]">
                ¿Olvidaste tu contraseña?
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 text-center px-2">
              <p className="text-[#504b78] text-lg leading-relaxed">
                Para restablecer tu contraseña, necesitas ponerte en contacto con el administrador del sistema.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border-2 border-blue-100">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Contacto por Teams</span>
                </div>
                <p className="text-blue-700 text-sm mb-3">
                  Comunícate con el administrador a través de Microsoft Teams para solicitar el restablecimiento de tu contraseña.
                </p>
              </div>
            </div>

            <DialogFooter className="pt-6 gap-3">
              <Button
                variant="outline"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 h-12 rounded-xl border-2 border-gray-200 hover:border-[#504b78] transition-all duration-300"
              >
                Cerrar
              </Button>
              <Button
                onClick={() => {
                  window.open('https://teams.microsoft.com/l/chat/0/0?users=admin@empresa.com', '_blank');
                }}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Abrir Teams
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
