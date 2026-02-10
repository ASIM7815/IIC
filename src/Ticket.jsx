import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Ticket.css';

export default function Ticket() {
  const location = useLocation();
  const registrationData = location.state || {};
  
  const [ticketId] = useState('TKT-2026-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const [invoiceUrl, setInvoiceUrl] = useState('');

  useEffect(() => {
    // Generate unique invoice URL
    const uniqueInvoiceId = 'INV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/invoice?id=${uniqueInvoiceId}&data=${encodeURIComponent(JSON.stringify(registrationData))}`;
    setInvoiceUrl(url);
  }, [registrationData]);

  const eventDetails = {
    title: 'R&D Orientation Program',
    subtitle: 'Faculty & Student Orientation',
    date: '12 February, 2026',
    time: '2:10 PM',
    venue: 'Seminar Hall - 1, Ground Floor',
    college: 'ISL Engineering College',
    description: 'Join us for an insightful orientation covering the R&D program objectives and expectations.'
  };

  const handleDownloadTicket = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Gradient-like background using multiple rectangles
    pdf.setFillColor(245, 245, 250);
    pdf.rect(0, 0, 210, 297, 'F');

    // Top gradient accent
    pdf.setFillColor(108, 58, 237);
    pdf.rect(0, 0, 210, 4, 'F');
    
    // Decorative corner elements
    pdf.setFillColor(168, 85, 247);
    pdf.circle(15, 15, 3, 'F');
    pdf.circle(195, 15, 3, 'F');
    pdf.circle(15, 282, 3, 'F');
    pdf.circle(195, 282, 3, 'F');

    // Main card background
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(15, 20, 180, 257, 5, 5, 'F');
    
    // Card shadow effect
    pdf.setDrawColor(200, 200, 220);
    pdf.setLineWidth(0.2);
    pdf.roundedRect(15, 20, 180, 257, 5, 5);

    // Status Badge with gradient effect
    pdf.setFillColor(6, 182, 212);
    pdf.roundedRect(25, 30, 70, 10, 3, 3, 'F');
    pdf.setFillColor(255, 255, 255);
    pdf.circle(30, 35, 1.5, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('REGISTRATION CONFIRMED', 60, 36, { align: 'center' });

    // Title with decorative line
    pdf.setTextColor(108, 58, 237);
    pdf.setFontSize(26);
    pdf.setFont('helvetica', 'bold');
    pdf.text('R&D Orientation Program', 105, 55, { align: 'center' });

    // Decorative line under title
    pdf.setDrawColor(168, 85, 247);
    pdf.setLineWidth(1);
    pdf.line(60, 60, 150, 60);

    // Subtitle
    pdf.setTextColor(120, 120, 140);
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Faculty & Student Orientation', 105, 68, { align: 'center' });

    // Event Details Cards
    let yPos = 85;
    const leftCol = 30;
    const cardWidth = 75;
    const cardHeight = 22;

    // Date Card
    pdf.setFillColor(250, 250, 255);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight, 3, 3, 'F');
    pdf.setDrawColor(108, 58, 237);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight, 3, 3);
    
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 170);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DATE', leftCol + 5, yPos + 7);
    pdf.setTextColor(30, 30, 50);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(eventDetails.date, leftCol + 5, yPos + 15);

    // Time Card
    yPos += 27;
    pdf.setFillColor(250, 250, 255);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight, 3, 3, 'F');
    pdf.setDrawColor(108, 58, 237);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight, 3, 3);
    
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 170);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TIME', leftCol + 5, yPos + 7);
    pdf.setTextColor(30, 30, 50);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(eventDetails.time, leftCol + 5, yPos + 15);

    // Venue Card
    yPos += 27;
    pdf.setFillColor(250, 250, 255);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight + 8, 3, 3, 'F');
    pdf.setDrawColor(108, 58, 237);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight + 8, 3, 3);
    
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 170);
    pdf.setFont('helvetica', 'bold');
    pdf.text('VENUE', leftCol + 5, yPos + 7);
    pdf.setTextColor(30, 30, 50);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(eventDetails.venue, leftCol + 5, yPos + 15);
    pdf.setFontSize(9);
    pdf.setTextColor(120, 120, 140);
    pdf.setFont('helvetica', 'normal');
    pdf.text(eventDetails.college, leftCol + 5, yPos + 22);

    // Ticket ID Card
    yPos += 35;
    pdf.setFillColor(250, 250, 255);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight, 3, 3, 'F');
    pdf.setDrawColor(108, 58, 237);
    pdf.setLineWidth(0.3);
    pdf.roundedRect(leftCol, yPos, cardWidth, cardHeight, 3, 3);
    
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 170);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TICKET ID', leftCol + 5, yPos + 7);
    pdf.setTextColor(6, 182, 212);
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(10);
    pdf.text(ticketId, leftCol + 5, yPos + 15);

    // QR Code Section with enhanced design
    const qrX = 120;
    const qrY = 85;
    const qrSize = 60;

    // QR Background card with gradient effect
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 25, 4, 4, 'F');
    pdf.setDrawColor(168, 85, 247);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 25, 4, 4);

    // Add decorative corners to QR box
    pdf.setDrawColor(108, 58, 237);
    pdf.setLineWidth(1.5);
    // Top-left corner
    pdf.line(qrX - 3, qrY - 3, qrX + 5, qrY - 3);
    pdf.line(qrX - 3, qrY - 3, qrX - 3, qrY + 5);
    // Top-right corner
    pdf.line(qrX + qrSize - 5, qrY - 3, qrX + qrSize + 3, qrY - 3);
    pdf.line(qrX + qrSize + 3, qrY - 3, qrX + qrSize + 3, qrY + 5);
    // Bottom-left corner
    pdf.line(qrX - 3, qrY + qrSize - 5, qrX - 3, qrY + qrSize + 3);
    pdf.line(qrX - 3, qrY + qrSize + 3, qrX + 5, qrY + qrSize + 3);
    // Bottom-right corner
    pdf.line(qrX + qrSize - 5, qrY + qrSize + 3, qrX + qrSize + 3, qrY + qrSize + 3);
    pdf.line(qrX + qrSize + 3, qrY + qrSize - 5, qrX + qrSize + 3, qrY + qrSize + 3);

    // Get HD QR Code
    const qrCanvas = document.querySelector('.qr-container canvas');
    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(qrImage, 'PNG', qrX, qrY, qrSize, qrSize, undefined, 'FAST');
    }
    
    // QR Label
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 120);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SCAN FOR INVOICE', qrX + qrSize/2, qrY + qrSize + 10, { align: 'center' });

    // Important Note Box with icon
    yPos = 215;
    pdf.setFillColor(248, 245, 255);
    pdf.roundedRect(25, yPos, 160, 25, 3, 3, 'F');
    pdf.setDrawColor(168, 85, 247);
    pdf.setLineWidth(1);
    pdf.line(25, yPos, 25, yPos + 25);
    
    // Info icon
    pdf.setDrawColor(168, 85, 247);
    pdf.setLineWidth(0.5);
    pdf.circle(35, yPos + 12, 3);
    pdf.setFontSize(10);
    pdf.setTextColor(168, 85, 247);
    pdf.setFont('helvetica', 'bold');
    pdf.text('i', 35, yPos + 13.5, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 100);
    pdf.setFont('helvetica', 'normal');
    const noteText = 'Scan the QR code above to download your invoice with complete registration details';
    const noteLines = pdf.splitTextToSize(noteText, 140);
    pdf.text(noteLines, 45, yPos + 10);

    // Decorative wave pattern at bottom
    pdf.setDrawColor(168, 85, 247);
    pdf.setLineWidth(0.3);
    for (let i = 0; i < 8; i++) {
      const waveY = 250 + Math.sin(i) * 2;
      pdf.line(25 + i * 20, waveY, 25 + (i + 1) * 20, 250 + Math.sin(i + 1) * 2);
    }

    // Footer with icon
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 170);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Made with love by IIC Innovation Team', 105, 265, { align: 'center' });

    // Save PDF
    pdf.save(`Ticket-${ticketId}.pdf`);
  };

  return (
    <div className="ticket-page">
      {/* Animated Background */}
      <div className="ticket-bg">
        <div className="ticket-orb ticket-orb-1"></div>
        <div className="ticket-orb ticket-orb-2"></div>
        <div className="ticket-orb ticket-orb-3"></div>
        <div className="ticket-grid-overlay"></div>
      </div>

      <div className="ticket-container">
        <div className="ticket-card">
          {/* Status Badge */}
          <div className="ticket-status">
            <div className="status-dot"></div>
            <span>Registration Confirmed</span>
          </div>

          {/* Event Title */}
          <div className="ticket-title-section">
            <h1 className="ticket-event-title">{eventDetails.title}</h1>
            <p className="ticket-event-subtitle">{eventDetails.subtitle}</p>
          </div>

          {/* Main Content Grid */}
          <div className="ticket-main-grid">
            {/* Event Details */}
            <div className="ticket-details-section">
              <div className="detail-row">
                <div className="detail-icon">📅</div>
                <div className="detail-content">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{eventDetails.date}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon">🕐</div>
                <div className="detail-content">
                  <span className="detail-label">Time</span>
                  <span className="detail-value">{eventDetails.time}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon">📍</div>
                <div className="detail-content">
                  <span className="detail-label">Venue</span>
                  <span className="detail-value">{eventDetails.venue}</span>
                  <span className="detail-subvalue">{eventDetails.college}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon">🎫</div>
                <div className="detail-content">
                  <span className="detail-label">Ticket ID</span>
                  <span className="detail-value ticket-id-value">{ticketId}</span>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="ticket-qr-section">
              <div className="qr-container">
                <div className="qr-glow"></div>
                <QRCodeSVG 
                  value={invoiceUrl || `https://iic.event/${ticketId}`}
                  size={240}
                  level="H"
                  includeMargin={false}
                  fgColor="#030014"
                  bgColor="#ffffff"
                />
              </div>
              <p className="qr-label">Scan for Invoice</p>
            </div>
          </div>

          {/* Important Note */}
          <div className="ticket-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Scan the QR code to download your invoice with registration details</span>
          </div>

          {/* Download Button */}
          <div className="ticket-download-section">
            <button onClick={handleDownloadTicket} className="download-ticket-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Your Ticket
            </button>
          </div>

          {/* Footer */}
          <div className="ticket-footer-section">
            <div className="footer-divider"></div>
            <p className="footer-text">Made with ❤️ by IIC Innovation Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
