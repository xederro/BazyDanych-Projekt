'use client'

import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {BarChart, ShoppingCart, FileDown} from 'lucide-react'
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
import Link from "next/link";
import {ScrollArea} from "@/components/ui/scroll-area";


const styles = StyleSheet.create({
  page: {padding: 30},
  title: {fontSize: 24, marginBottom: 10},
  subtitle: {fontSize: 18, marginBottom: 10},
  table: {display: 'table', width: 'auto', marginBottom: 10},
  tableRow: {flexDirection: 'row'},
  tableCol: {width: '50%', borderStyle: 'solid', borderWidth: 1, padding: 5},
  tableCol2: {width: '33%', borderStyle: 'solid', borderWidth: 1, padding: 5},
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
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}><Text>{data.total_orders}</Text></View>
          <View style={styles.tableCol}><Text>{data.sales.toFixed(2)} PLN</Text></View>
        </View>
      </View>

      <Text style={styles.subtitle}>Top sold products</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCol2}><Text>Top Products</Text></View>
          <View style={styles.tableCol2}><Text>Total Revenue</Text></View>
          <View style={styles.tableCol2}><Text>Total Count</Text></View>
        </View>
        {data.top.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol2}><Text>{item.name}</Text></View>
            <View style={styles.tableCol2}><Text>{item.revenue.toFixed(2)} PLN</Text></View>
            <View style={styles.tableCol2}><Text>{item.count}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

interface ReportProps {
  report?: [
    {
      sales: number,
      month: string,
      year: string,
      total_orders: number,
      top: [
        {
          "name": string,
          "count": number,
          "revenue": number
        },
      ],
    }
  ],
  in_stock?: [{
    name: string,
    stock: number,
    reserved: number,
    product_id: number,
  }]
}

export function ReportDashboard({report, in_stock}: ReportProps) {
  const [selectedReport, setSelectedReport] = useState(report[0])

  const handleReportChange = (value: number) => {
    setSelectedReport(report[value])
  }

  const selectedMonthLabel = selectedReport.month+selectedReport.year
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // @ts-ignore
  return (
    <>
      <div className="flex justify-between items-center mb-6" >
        <h1 className="text-3xl font-bold text-gray-900">Report Dashboard</h1>
        {
          isClient && <PDFDownloadLink
                document={<PDFReport data={selectedReport} selectedMonth={selectedMonthLabel}/>}
                fileName={`report-${selectedMonthLabel.replace(" ", "-")}.pdf`}
            >
            {({blob, url, loading, error}) =>
              <Button variant="secondary" className="bg-violet-600 text-white hover:bg-violet-700" disabled={loading} >
                {loading ? 'Loading document...' : 'Download PDF Report'}
                <FileDown className="ml-2 h-4 w-4" />
              </Button>
            }
            </PDFDownloadLink>
        }
      </div>
      <div className="mb-6">
        <Select onValueChange={handleReportChange} value={0}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select raport"/>
          </SelectTrigger>
          <SelectContent>
            {report.map((rep,k) => (
              <SelectItem key={k} value={k}>{rep.month} {rep.year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedReport.total_orders}</div>
            <p className="text-xs text-muted-foreground">For {selectedMonthLabel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedReport.sales.toFixed(2)} zł</div>
            <p className="text-xs text-muted-foreground">For {selectedMonthLabel}</p>
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
                {selectedReport.top.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>{item.revenue.toFixed(2)} zł</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products in Stock: {in_stock.length}</CardTitle>
            <CardDescription>Current inventory levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-[500px] rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity in Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {in_stock.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link href={"/product/"+product.product_id}>
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell>{product.stock - product.reserved}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  )
}