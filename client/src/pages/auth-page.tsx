import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
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
  const [, setLocation] = useLocation();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    name: "",
    area: "" as any,
    adminPassword: "",
  });

  // Redirect if user is authenticated
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  // Don't render if user exists
  if (user) {
    return null;
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
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 w-48 h-48 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float"></div>
        <div className="absolute top-32 right-16 w-64 h-64 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-35 animate-float-delayed"></div>
        <div className="absolute -bottom-24 left-1/3 w-56 h-56 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-45 animate-float-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Logo y título */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-30 h-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl mb-4 transform hover:scale-105 transition-transform duration-300">
            <img
              src="/LogoJASANA.png"
              alt="JASANA Logo"
              className="w-15 h-15 object-contain"
              draggable={false}
            />
          </div>
          <p className="text-gray-600 font-medium text-sm">Sistema de Gestión de Pedidos</p>
        </div>

        <Card className="backdrop-blur-lg bg-white/80 shadow-2xl border border-purple-200/50 rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-6 pt-6">
            <CardTitle className="text-2xl font-bold mb-2 text-gray-800 flex items-center justify-center gap-2">
              {isRegisterMode ? (
                <>
                  <Users className="w-6 h-6" />
                  Crear Cuenta
                </>
              ) : (
                <>
                  <User className="w-6 h-6" />
                  Iniciar Sesión
                </>
              )}
            </CardTitle>
            <p className="text-gray-600 text-sm">
              {isRegisterMode 
                ? "Complete los datos para registrarse" 
                : "Ingrese sus credenciales para acceder"
              }
            </p>
          </CardHeader>

          <CardContent className="p-6 pt-0">
            {!isRegisterMode ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username" className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    Usuario
                  </Label>
                  <Input
                    id="login-username"
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                    className="h-11 rounded-xl border border-purple-200 focus:border-purple-400 transition-all duration-300 text-sm px-4 bg-white/70 backdrop-blur-sm text-gray-800 placeholder:text-gray-500"
                    placeholder="Ingrese su usuario"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-700 font-semibold flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4" />
                    Contraseña
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="h-11 rounded-xl border border-purple-200 focus:border-purple-400 transition-all duration-300 text-sm px-4 bg-white/70 backdrop-blur-sm text-gray-800 placeholder:text-gray-500"
                    placeholder="Ingrese su contraseña"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-sm"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <User className="mr-2 h-4 w-4" />
                  )}
                  Iniciar Sesión
                </Button>

                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300 text-xs underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="register-username" className="text-gray-700 font-semibold flex items-center gap-1 text-xs">
                      <User className="w-3 h-3" />
                      Usuario
                    </Label>
                    <Input
                      id="register-username"
                      type="text"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      required
                      className="h-9 rounded-lg border border-purple-200 focus:border-purple-400 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 text-sm"
                      placeholder="Usuario"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="register-password" className="text-gray-700 font-semibold flex items-center gap-1 text-xs">
                      <Lock className="w-3 h-3" />
                      Contraseña
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      className="h-9 rounded-lg border border-purple-200 focus:border-purple-400 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 text-sm"
                      placeholder="Contraseña"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="register-name" className="text-gray-700 font-semibold flex items-center gap-1 text-xs">
                    <Users className="w-3 h-3" />
                    Nombre Completo
                  </Label>
                  <Input
                    id="register-name"
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                    className="h-9 rounded-lg border border-purple-200 focus:border-purple-400 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder:text-gray-500 text-sm"
                    placeholder="Ingrese su nombre completo"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="register-area" className="text-gray-700 font-semibold flex items-center gap-1 text-xs">
                    <Building2 className="w-3 h-3" />
                    Área de Trabajo
                  </Label>
                  <Select
                    value={registerData.area}
                    onValueChange={(value) => setRegisterData({ ...registerData, area: value as any })}
                  >
                    <SelectTrigger className="h-9 rounded-lg border border-purple-200 focus:border-purple-400 bg-white/70 backdrop-blur-sm text-gray-800 text-sm">
                      <SelectValue placeholder="Seleccionar área" className="text-gray-500" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg bg-white/95 backdrop-blur-lg border-purple-200">
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
                  <div className="space-y-1">
                    <Label htmlFor="admin-password" className="text-gray-700 font-semibold flex items-center gap-1 text-xs">
                      <Shield className="w-3 h-3" />
                      Contraseña de Admin
                    </Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={registerData.adminPassword}
                      onChange={(e) => setRegisterData({ ...registerData, adminPassword: e.target.value })}
                      required
                      placeholder="Requerida para registrarse"
                      className="h-9 rounded-lg border border-orange-300 focus:border-orange-400 transition-all duration-300 bg-orange-100/50 backdrop-blur-sm text-gray-800 placeholder:text-orange-600 text-sm"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-sm"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Users className="mr-2 h-4 w-4" />
                  )}
                  Crear Cuenta
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="group flex items-center gap-2 mx-auto text-gray-600 hover:text-gray-800 font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-purple-100/50 backdrop-blur-sm text-sm"
              >
                <RotateCcw className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                {isRegisterMode 
                  ? "¿Ya tienes cuenta? Inicia sesión" 
                  : "¿No tienes cuenta? Regístrate"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="max-w-sm rounded-2xl bg-white/95 backdrop-blur-lg border border-purple-200 shadow-2xl">
          <DialogHeader className="text-center pb-3">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-800">
              ¿Olvidaste tu contraseña?
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-center px-1">
            <p className="text-gray-600 text-sm leading-relaxed">
              Para restablecer tu contraseña, necesitas ponerte en contacto con el administrador del sistema.
            </p>

            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-3 rounded-xl border border-blue-500/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-blue-300 text-sm">Contacto por Teams</span>
              </div>
              <p className="text-blue-600 text-xs mb-2">
                Comunícate con el administrador a través de Microsoft Teams para solicitar el restablecimiento de tu contraseña.
              </p>
            </div>
          </div>

          <DialogFooter className="pt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => setShowForgotPassword(false)}
              className="flex-1 h-9 rounded-lg border border-purple-200 hover:border-purple-400 transition-all duration-300 text-gray-800 text-sm"
            >
              Cerrar
            </Button>
            <Button
              onClick={() => {
                window.open(`msteams:/l/chat/0/0?users=admin`);
              }}
              className="flex-1 h-9 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-sm"
            >
              <MessageSquare className="mr-1 h-3 w-3" />
              Abrir Teams
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}