
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, AlertTriangle, FileText } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7300', '#00C49F', '#0088FE'];

export default function MetricsPage() {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  if (user?.area !== 'admin') {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Acceso Denegado</h2>
              <p className="text-gray-600">Solo los administradores pueden acceder a las métricas.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const { data: monthlyMetrics, isLoading: monthlyLoading } = useQuery({
    queryKey: ['metrics', 'monthly', selectedMonth, selectedYear],
    queryFn: async () => {
      const response = await fetch(`/api/metrics/monthly?month=${selectedMonth}&year=${selectedYear}`);
      if (!response.ok) throw new Error('Error al cargar métricas mensuales');
      return response.json();
    }
  });

  const { data: overallMetrics, isLoading: overallLoading } = useQuery({
    queryKey: ['metrics', 'overall'],
    queryFn: async () => {
      const response = await fetch('/api/metrics/overall');
      if (!response.ok) throw new Error('Error al cargar métricas generales');
      return response.json();
    }
  });

  const { data: requestAnalysis, isLoading: requestLoading } = useQuery({
    queryKey: ['metrics', 'requests'],
    queryFn: async () => {
      const response = await fetch('/api/metrics/requests');
      if (!response.ok) throw new Error('Error al cargar análisis de solicitudes');
      return response.json();
    }
  });

  const handleExport = async (type: 'monthly' | 'overall' | 'requests') => {
    try {
      const params = type === 'monthly' ? `?month=${selectedMonth}&year=${selectedYear}` : '';
      const response = await fetch(`/api/metrics/export/${type}${params}`);
      
      if (!response.ok) throw new Error('Error al exportar');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `metricas-${type}-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar:', error);
    }
  };

  const currentMonthName = new Date(parseInt(selectedYear), parseInt(selectedMonth)).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Métricas de Reposiciones</h1>
              <p className="text-gray-600">Análisis y estadísticas del sistema</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 items-center">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {new Date(0, i).toLocaleDateString('es-ES', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 3 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Métricas Mensuales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Métricas de {currentMonthName}</CardTitle>
            <Button onClick={() => handleExport('monthly')} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            {monthlyLoading ? (
              <div className="text-center py-8">Cargando métricas mensuales...</div>
            ) : monthlyMetrics ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de barras - Reposiciones por área */}
                <div>
                  <h3 className="font-semibold mb-4">Reposiciones por Área</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyMetrics.byArea}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="area" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gráfico de pastel - Porcentajes */}
                <div>
                  <h3 className="font-semibold mb-4">Distribución Porcentual</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={monthlyMetrics.byArea}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ area, percentage }) => `${area}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {monthlyMetrics.byArea.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Tabla de estadísticas */}
                <div className="lg:col-span-2">
                  <h3 className="font-semibold mb-4">Estadísticas Detalladas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {monthlyMetrics.byArea.map((area: any, index: number) => (
                      <Card key={area.area}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{area.area}</p>
                              <p className="text-sm text-gray-600">{area.count} reposiciones</p>
                              <p className="text-sm text-gray-600">{area.pieces} piezas</p>
                            </div>
                            <Badge style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                              {area.percentage}%
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>
            )}
          </CardContent>
        </Card>

        {/* Causas de Daño */}
        <Card>
          <CardHeader>
            <CardTitle>Causas de Daño - {currentMonthName}</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyMetrics?.byCause && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Distribución de Causas</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyMetrics.byCause}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="cause" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Detalle de Causas</h3>
                  {monthlyMetrics.byCause.map((cause: any, index: number) => (
                    <div key={cause.cause} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">{cause.cause}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{cause.count}</span>
                        <Badge variant="outline">{cause.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Métricas Generales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Métricas Generales (Todo el tiempo)</CardTitle>
            <Button onClick={() => handleExport('overall')} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            {overallLoading ? (
              <div className="text-center py-8">Cargando métricas generales...</div>
            ) : overallMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Reposiciones</p>
                        <p className="text-2xl font-bold">{overallMetrics.totalRepositions}</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Piezas</p>
                        <p className="text-2xl font-bold">{overallMetrics.totalPieces}</p>
                      </div>
                      <Users className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Área Más Activa</p>
                        <p className="text-2xl font-bold">{overallMetrics.mostActiveArea}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Promedio Mensual</p>
                        <p className="text-2xl font-bold">{overallMetrics.monthlyAverage}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>
            )}
          </CardContent>
        </Card>

        {/* Análisis por Número de Solicitud */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Análisis por Número de Solicitud</CardTitle>
            <Button onClick={() => handleExport('requests')} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            {requestLoading ? (
              <div className="text-center py-8">Cargando análisis de solicitudes...</div>
            ) : requestAnalysis ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Solicitudes con Reposiciones</p>
                        <p className="text-2xl font-bold">{requestAnalysis.totalRequestsWithRepositions}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Promedio Repos./Solicitud</p>
                        <p className="text-2xl font-bold">{requestAnalysis.averageRepositionsPerRequest}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Solicitud Más Problemática</p>
                        <p className="text-2xl font-bold">{requestAnalysis.mostProblematicRequest}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Top 10 Solicitudes con Más Reposiciones</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">No. Solicitud</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Reposiciones</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Reprocesos</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestAnalysis.topRequests.map((request: any) => (
                          <tr key={request.noSolicitud}>
                            <td className="border border-gray-300 px-4 py-2">{request.noSolicitud}</td>
                            <td className="border border-gray-300 px-4 py-2">{request.reposiciones}</td>
                            <td className="border border-gray-300 px-4 py-2">{request.reprocesos}</td>
                            <td className="border border-gray-300 px-4 py-2 font-semibold">{request.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
