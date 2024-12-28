'use client'

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState} from 'react'
import {Button} from "@/components/ui/button"
import {BarChart, Package, ShoppingCart, FileDown} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {PDFDownloadLink, Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer'

const initialReportData = {
  soldItems: [
    {name: "AMD Ryzen 9 5950X", quantity: 15, revenue: 10499.85},
    {name: "NVIDIA GeForce RTX 3080", quantity: 10, revenue: 6999.90},
    {name: "Samsung 970 EVO Plus 1TB", quantity: 25, revenue: 3749.75},
  ],
  productsInStock: [
    {name: "AMD Ryzen 9 5950X", quantity: 5},
    {name: "NVIDIA GeForce RTX 3080", quantity: 3},
    {name: "Samsung 970 EVO Plus 1TB", quantity: 20},
  ],
  ordersThisMonth: 45,
  totalRevenueThisMonth: 52749.50,
}

const months = [
  {value: "2024-05", label: "May 2024"},
  {value: "2024-04", label: "April 2024"},
  {value: "2024-03", label: "March 2024"},
]

const styles = StyleSheet.create({
  page: {padding: 30},
  title: {fontSize: 24, marginBottom: 10},
  subtitle: {fontSize: 18, marginBottom: 10},
  table: {display: 'table', width: 'auto', marginBottom: 10},
  tableRow: {flexDirection: 'row'},
  tableCol: {width: '33%', borderStyle: 'solid', borderWidth: 1, padding: 5},
  tableHeader: {backgroundColor: '#f0f0f0', fontWeight: 'bold'},
})

// @ts-ignore
const PDFReport = ({data, selectedMonth}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Monthly Report - {selectedMonth}</Text>

      <Text style={styles.subtitle}>Summary</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCol}><Text>Total Orders</Text></View>
          <View style={styles.tableCol}><Text>Total Revenue</Text></View>
          <View style={styles.tableCol}><Text>Products in Stock</Text></View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text>{data.ordersThisMonth}</Text></View>
          <View style={styles.tableCol}><Text>${data.totalRevenueThisMonth.toFixed(2)}</Text></View>
          <View style={styles.tableCol}>
            <Text>{data.productsInStock.reduce((sum: any, product: {
              quantity: any
            }) => sum + product.quantity, 0)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>Sold Items</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCol}><Text>Product Name</Text></View>
          <View style={styles.tableCol}><Text>Quantity Sold</Text></View>
          <View style={styles.tableCol}><Text>Revenue</Text></View>
        </View>
        {data.soldItems.map((item: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; revenue: number }, index: Key | null | undefined) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text>{item.name}</Text></View>
            <View style={styles.tableCol}><Text>{item.quantity}</Text></View>
            <View style={styles.tableCol}><Text>${item.revenue.toFixed(2)}</Text></View>
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>Products in Stock</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCol}><Text>Product Name</Text></View>
          <View style={styles.tableCol}><Text>Quantity in Stock</Text></View>
        </View>

        {data.productsInStock.map((product: {
          name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
          quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined
        }, index: Key | null | undefined) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text>{product.name}</Text></View>
            <View style={styles.tableCol}><Text>{product.quantity}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

export function ReportDashboard() {
  const [reportData, setReportData] = useState(initialReportData)
  const [selectedMonth, setSelectedMonth] = useState(months[0].value)

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value)
    // In a real application, you would fetch data for the selected month here
    // For this example, we'll just use the same data for all months
    setReportData(initialReportData)
  }

  const selectedMonthLabel = months.find(month => month.value === selectedMonth)?.label || ''

  // @ts-ignore
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Report Dashboard</h1>
        {/*cos jest nie tak w sensie ładuje się i działa ale zwraca error 500 serwerek*/}
        <PDFDownloadLink
          document={<PDFReport data={reportData} selectedMonth={selectedMonthLabel} />}
          fileName={`report-${selectedMonth}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            <Button variant="secondary" className="bg-violet-600 text-white hover:bg-violet-700" disabled={loading}>
              {loading ? 'Loading document...' : 'Download PDF Report'}
              <FileDown className="ml-2 h-4 w-4" />
            </Button>
          }
        </PDFDownloadLink>
      </div>

      <div className="mb-6">
        <Select onValueChange={handleMonthChange} value={selectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.ordersThisMonth}</div>
            <p className="text-xs text-muted-foreground">For {selectedMonthLabel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${reportData.totalRevenueThisMonth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">For {selectedMonthLabel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.productsInStock.reduce((sum, product) => sum + product.quantity, 0)}</div>
            <p className="text-xs text-muted-foreground">Total units across all products</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Sold Items</CardTitle>
            <CardDescription>Top selling products for {selectedMonthLabel}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.soldItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.revenue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products in Stock</CardTitle>
            <CardDescription>Current inventory levels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity in Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.productsInStock.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}