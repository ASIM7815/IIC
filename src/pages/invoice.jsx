import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../invoice.css';

function Invoice() {
  const [searchParams] = useSearchParams();
  const [invoiceData, setInvoiceData] = useState({
    fullName: '',
    college: 'ISL Engineering College',
    department: '',
    section: '',
    rollNumber: '',
    year: '',
    mobile: '',
    email: ''
  });
  const [autoDownload, setAutoDownload] = useState(false);

  useEffect(() => {
    // Get data from URL parameters
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setInvoiceData({
          fullName: parsedData.fullName || '',
          college: parsedData.college || 'ISL Engineering College',
          department: parsedData.department || '',
          section: parsedData.section || '',
          rollNumber: parsedData.rollNumber || '',
          year: parsedData.year || '',
          mobile: parsedData.phone || '',
          email: parsedData.email || ''
        });
        setAutoDownload(true);
      } catch (error) {
        console.error('Error parsing data:', error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (autoDownload && invoiceData.fullName) {
      // Auto-download PDF after data is loaded
      setTimeout(() => {
        handleDownloadInvoice();
      }, 1000);
    }
  }, [autoDownload, invoiceData]);

  const handleDownloadInvoice = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // White background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 210, 297, 'F');

    // Border
    pdf.setDrawColor(0, 51, 102);
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, 190, 277);

    // Header
    pdf.setTextColor(0, 51, 102);
    pdf.setFontSize(18);
    pdf.setFont('times', 'bold');
    pdf.text('INSTITUTIONS\' INNOVATION COUNCIL (IIC)', 105, 25, { align: 'center' });

    pdf.setFontSize(13);
    pdf.setFont('times', 'normal');
    pdf.text('ISLEC – Innovation & Startup Cell', 105, 32, { align: 'center' });

    // Title Box
    pdf.setDrawColor(0, 51, 102);
    pdf.setLineWidth(0.8);
    pdf.line(50, 40, 160, 40);
    pdf.line(50, 48, 160, 48);
    
    pdf.setFontSize(14);
    pdf.setFont('times', 'bold');
    pdf.text('OFFICIAL REGISTRATION INVOICE', 105, 45, { align: 'center' });

    // Programme Title
    pdf.setFontSize(12);
    pdf.setFont('times', 'normal');
    pdf.text('Faculty & Student Orientation Programme', 105, 56, { align: 'center' });
    pdf.text('Research & Development (R&D)', 105, 62, { align: 'center' });

    // Participant Details Section
    let yPos = 75;
    pdf.setFontSize(12);
    pdf.setFont('times', 'bold');
    pdf.setTextColor(0, 51, 102);
    pdf.text('PARTICIPANT DETAILS', 20, yPos);

    // Table
    yPos += 5;
    const tableData = [
      ['Full Name', invoiceData.fullName],
      ['College Name', invoiceData.college],
      ['Department', invoiceData.department],
      ['Section', invoiceData.section],
      ['Roll Number', invoiceData.rollNumber],
      ['Current Academic Year', invoiceData.year],
      ['Mobile Number', invoiceData.mobile],
      ['Email ID', invoiceData.email]
    ];

    pdf.setDrawColor(207, 216, 220);
    pdf.setLineWidth(0.3);

    tableData.forEach((row, index) => {
      const rowY = yPos + (index * 12);
      
      // Background for label column
      pdf.setFillColor(245, 247, 250);
      pdf.rect(20, rowY, 70, 12, 'F');
      
      // Borders
      pdf.rect(20, rowY, 70, 12);
      pdf.rect(90, rowY, 100, 12);
      
      // Text
      pdf.setFontSize(11);
      pdf.setFont('times', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(row[0], 23, rowY + 8);
      
      pdf.setFont('times', 'normal');
      pdf.text(row[1] || '', 93, rowY + 8);
    });

    // Confirmation Text
    yPos += (tableData.length * 12) + 15;
    pdf.setFontSize(11);
    pdf.setFont('times', 'normal');
    pdf.setTextColor(0, 0, 0);
    
    const confirmText = 'This document certifies that the above-mentioned participant has successfully registered for the Faculty & Student Orientation Programme – Research & Development (R&D), conducted under ISLEC – Institutions\' Innovation Council (IIC).';
    
    const lines = pdf.splitTextToSize(confirmText, 170);
    pdf.text(lines, 20, yPos);

    // Footer
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Generated on: ' + new Date().toLocaleDateString(), 105, 280, { align: 'center' });

    // Save PDF
    pdf.save(`Invoice-${invoiceData.rollNumber || 'Registration'}.pdf`);
  };

  return (
    <div className="invoice-container">
      {/* HEADER */}
      <div className="invoice-header">
        <h1>INSTITUTIONS' INNOVATION COUNCIL (IIC)</h1>
        <h2>ISLEC – Innovation & Startup Cell</h2>

        <h3>OFFICIAL REGISTRATION INVOICE</h3>

        <div className="programme-title">
          Faculty & Student Orientation Programme<br />
          Research & Development (R&amp;D)
        </div>
      </div>

      {/* PARTICIPANT DETAILS */}
      <div className="section-title">Participant Details</div>
      <table>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{invoiceData.fullName}</td>
          </tr>
          <tr>
            <td>College Name</td>
            <td>{invoiceData.college}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{invoiceData.department}</td>
          </tr>
          <tr>
            <td>Section</td>
            <td>{invoiceData.section}</td>
          </tr>
          <tr>
            <td>Roll Number</td>
            <td>{invoiceData.rollNumber}</td>
          </tr>
          <tr>
            <td>Current Academic Year</td>
            <td>{invoiceData.year}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>{invoiceData.mobile}</td>
          </tr>
          <tr>
            <td>Email ID</td>
            <td>{invoiceData.email}</td>
          </tr>
        </tbody>
      </table>

      {/* CONFIRMATION TEXT */}
      <div className="confirmation-text">
        This document certifies that the above-mentioned participant has
        successfully registered for the <strong>Faculty & Student Orientation Programme –
        Research & Development (R&amp;D)</strong>, conducted under
        <strong> ISLEC – Institutions' Innovation Council (IIC)</strong>.
      </div>

      {/* Manual Download Button */}
      {!autoDownload && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={handleDownloadInvoice}
            style={{
              padding: '12px 32px',
              background: '#003366',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            Download Invoice
          </button>
        </div>
      )}
    </div>
  );
}

export default Invoice;
