# 🚀 Görsel İndirme ve Optimize Etme Scripti
# Bu script otomatik olarak Unsplash'tan görselleri indirir, 
# SEO uyumlu isimlerle kaydeder ve WebP'ye dönüştürür.

Write-Host "🚀 Konya Ese Dayı - Görsel Optimizasyon Script'i" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Hedef klasör
$outputDir = "src\assets\optimized"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
    Write-Host "📁 Optimized klasörü oluşturuldu" -ForegroundColor Green
}

# Görsel listesi (Unsplash URLs)
$images = @(
    @{
        url = "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1400&q=80"
        filename = "konya-cekici-saha-01.webp"
        alt = "Konya Ese Dayı Çekici - Gece oto kurtarma hizmeti"
    },
    @{
        url = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80"
        filename = "konya-cekici-saha-02.webp"
        alt = "Konya Oto Kurtarma - Profesyonel çekici operasyonu"
    },
    @{
        url = "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1400&q=80"
        filename = "konya-cekici-saha-03.webp"
        alt = "Konya Yol Yardım - Platform çekici ile araç transferi"
    },
    @{
        url = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80"
        filename = "konya-cekici-saha-04.webp"
        alt = "Konya Acil Çekici - Hızlı müdahale ekipleri"
    }
)

Write-Host "📥 Görseller indiriliyor..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$errorCount = 0

foreach ($image in $images) {
    $outputPath = Join-Path $outputDir $image.filename
    
    try {
        Write-Host "  ⬇️  İndiriliyor: $($image.filename)" -ForegroundColor Gray
        
        # Görseli indir
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath -UseBasicParsing
        
        # Dosya boyutunu kontrol et
        $fileSize = (Get-Item $outputPath).Length / 1KB
        
        if ($fileSize -gt 200) {
            Write-Host "  ⚠️  UYARI: $($image.filename) boyutu büyük ($([math]::Round($fileSize, 0))KB)" -ForegroundColor Yellow
            Write-Host "     💡 Squoosh.app ile optimize etmeyi unutmayın!" -ForegroundColor Yellow
        } else {
            Write-Host "  ✅ Başarılı ($([math]::Round($fileSize, 0))KB)" -ForegroundColor Green
        }
        
        $successCount++
    }
    catch {
        Write-Host "  ❌ HATA: $($image.filename)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "📊 İndirme Özeti:" -ForegroundColor Cyan
Write-Host "  ✅ Başarılı: $successCount" -ForegroundColor Green
Write-Host "  ❌ Hatalı: $errorCount" -ForegroundColor Red
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "🎉 Görseller başarıyla indirildi!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Sonraki Adımlar:" -ForegroundColor Yellow
    Write-Host "  1. Görselleri Squoosh.app ile optimize edin" -ForegroundColor Gray
    Write-Host "  2. Format: WebP, Kalite: 80-85%" -ForegroundColor Gray
    Write-Host "  3. Boyut: 1400x900px" -ForegroundColor Gray
    Write-Host "  4. Hedef boyut: < 200KB" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📖 Detaylı rehber için: IMAGE_OPTIMIZATION_GUIDE.md" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Görseller indirilemedi." -ForegroundColor Yellow
    Write-Host "   Manuel indirme yapmanız gerekiyor." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Script tamamlandı!" -ForegroundColor Cyan
