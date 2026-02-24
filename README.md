# Modern Logistics - Single Page Application (SPA)

A sleek, responsive delivery and tracking website built with pure HTML5, CSS3, and vanilla JavaScript.

## 🎨 Design Features

- **Color Palette**: Deep Navy (#0f172a) + Electric Blue (#3b82f6)
- **Typography**: Inter Sans-Serif font for premium aesthetics
- **Responsive**: Mobile-first design with fluid layouts
- **Animations**: Smooth CSS transitions and keyframe animations
- **Layout**: CSS Flexbox & Grid for modern, flexible layouts

## ✨ Key Features

### 1. **Hero Search Bar**
- Enter tracking IDs (e.g., "SHIP-2024")
- Real-time input validation and uppercase conversion
- Keyboard shortcuts: `Ctrl + /` to focus, `Esc` to clear

### 2. **Visual Progress Stepper**
- 5-step progress: Ordered → Processed → In Transit → Out for Delivery → Delivered
- Animated checkmark icons with color transitions
- Shows completion dates and current status
- Smooth pulse animation on active step

### 3. **Real-Time Shipment Log**
- Interactive data table with 6 mock shipments
- Status badges with color coding
- Responsive design (hides columns on mobile)
- Hover effects for better UX

### 4. **Shipping Rate Calculator**
- Weight × Distance formula with service multipliers
- Three service types: Land, Sea, Air
- Real-time calculation with breakdown display
- Estimated delivery timeframes

### 5. **Service Cards**
- Air, Sea, and Land freight options
- Hover-scale effects (transforms: translateY & scale)
- Icon animations on hover
- Color-coded service categories

### 6. **Premium UX Elements**
- Sticky navigation bar
- Smooth page scrolling
- Intersection Observer for lazy animations
- Shadow depths for visual hierarchy
- Print-friendly stylesheet

## 🚀 Quick Start

### Option 1: Open Directly in Browser
```bash
# On Windows, simply double-click index.html
# Or right-click → Open with → Your browser
```

### Option 2: Use Python Server (Recommended for testing)
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Then visit: http://localhost:8000
```

### Option 3: Use Node.js Server
```bash
# If you have Node.js installed
npx http-server
```

### Option 4: Use Live Server (VSCode Extension)
1. Install "Live Server" extension in VSCode
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📝 Sample Tracking IDs

Try these tracking IDs in the search bar:
- **SHIP-2024** - Out for Delivery (Land freight)
- **SHIP-2025** - In Transit (Sea freight)
- **SHIP-2026** - Processed (Air freight)
- **SHIP-2027** - Delivered (Air freight)
- **SHIP-2028** - In Transit (Sea freight)
- **SHIP-2029** - Delivered (Land freight)

Or use `demoTracking()` in browser console for random tracking.

## 🧮 Rate Calculator Examples

- **10 kg, 500 km, Land**: ~$124.00 (3-7 days)
- **100 kg, 1000 km, Sea**: ~$230.00 (7-14 days)
- **50 kg, 2000 km, Air**: ~$500.00 (1-2 days)

Formula: `Base Rate + (Weight × Multiplier) + (Distance × Multiplier)`

## 📱 Responsive Breakpoints

- **Desktop**: Full table, 3-column grid layouts
- **Tablet (768px)**: Adjusted spacing, stacked calculator
- **Mobile (480px)**: Hidden table columns, single column layout

## ⚡ Performance Optimizations

- ✅ No external dependencies (pure vanilla JS)
- ✅ Minimal CSS (optimized for < 50KB)
- ✅ Hardware-accelerated animations (transform, opacity)
- ✅ Lazy-loaded animations with IntersectionObserver
- ✅ Event delegation for efficient event handling
- ✅ Touch-friendly interactive elements

## 🎯 Navigation

- **Sticky Nav**: All sections linked in navigation bar
- **Smooth Scroll**: Click any anchor link for smooth scrolling
- **Keyboard Friendly**: Tab navigation, Enter to submit

## 📂 File Structure

```
Delivery-website2/
├── index.html          # Semantic HTML5 structure
├── styles.css          # Complete styling with animations
├── script.js           # Vanilla JavaScript (no frameworks)
└── README.md          # This file
```

## 🛠️ Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ Limited (no CSS Grid/Flexbox gaps)

## 💡 Customization

### Change Brand Colors
Edit `:root` variables in `styles.css`:
```css
--deep-navy: #0f172a;
--electric-blue: #3b82f6;
```

### Update Mock Data
Modify `mockShipments` array in `script.js` with your shipment data.

### Add More Services
Add icons and cards in `index.html`, update `services-grid` styling.

### Adjust Calculator Rates
Edit `rateConfig` object in `script.js`:
```javascript
land: {
    baseRate: 50,               // Customize
    weightMultiplier: 2.5,      // $/kg
    distanceMultiplier: 0.08,   // $/km
    estimatedDays: '3-7'
}
```

## 🔒 Security Notes

- All data is client-side (mock data)
- No backend required for demo
- Safe for production with proper backend integration
- Input validation on tracking ID and calculator fields

## 🚢 Next Steps for Production

1. **Backend Integration**: Connect to real shipment database
2. **Authentication**: Add user login/registration
3. **API Setup**: Create REST endpoints for tracking
4. **Database**: Store shipment and user data
5. **PWA**: Add service worker for offline support
6. **Analytics**: Track user interactions
7. **Notifications**: Email/SMS delivery updates

## 📞 Support

- Check browser console for debug info
- Try keyboard shortcut Ctrl + / in search bar
- Use demoTracking() in console
- Test different viewport sizes (DevTools)

## 📄 License

Free to use and modify. Built with ❤️ for modern logistics solutions.

---

**Pro Tip**: Open DevTools (F12) and try `demoTracking()` in console for instant demo!
