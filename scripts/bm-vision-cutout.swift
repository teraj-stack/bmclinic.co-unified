import AppKit
import CoreImage
import CoreImage.CIFilterBuiltins
import Foundation
import Vision

struct StyleVariant {
  let id: String
  let topColor: CIColor
  let bottomColor: CIColor
  let glowTint: CIColor
  let contrast: Float
  let saturation: Float
  let warmth: Float
}

let variants: [StyleVariant] = [
  StyleVariant(
    id: "proktologia-emerald",
    topColor: CIColor(red: 0.03, green: 0.16, blue: 0.15, alpha: 1.0),
    bottomColor: CIColor(red: 0.05, green: 0.09, blue: 0.11, alpha: 1.0),
    glowTint: CIColor(red: 0.14, green: 0.72, blue: 0.68, alpha: 0.25),
    contrast: 1.06,
    saturation: 1.08,
    warmth: 6200
  ),
  StyleVariant(
    id: "chirurgia-steel",
    topColor: CIColor(red: 0.96, green: 0.97, blue: 0.99, alpha: 1.0),
    bottomColor: CIColor(red: 0.85, green: 0.89, blue: 0.94, alpha: 1.0),
    glowTint: CIColor(red: 0.76, green: 0.82, blue: 0.90, alpha: 0.28),
    contrast: 1.04,
    saturation: 0.95,
    warmth: 7000
  ),
  StyleVariant(
    id: "flebologia-lavender",
    topColor: CIColor(red: 0.92, green: 0.90, blue: 0.99, alpha: 1.0),
    bottomColor: CIColor(red: 0.81, green: 0.86, blue: 0.98, alpha: 1.0),
    glowTint: CIColor(red: 0.56, green: 0.49, blue: 0.92, alpha: 0.22),
    contrast: 1.03,
    saturation: 1.06,
    warmth: 6600
  ),
  StyleVariant(
    id: "flebologia-male-teal",
    topColor: CIColor(red: 0.05, green: 0.20, blue: 0.26, alpha: 1.0),
    bottomColor: CIColor(red: 0.03, green: 0.11, blue: 0.17, alpha: 1.0),
    glowTint: CIColor(red: 0.16, green: 0.78, blue: 0.82, alpha: 0.28),
    contrast: 1.07,
    saturation: 1.12,
    warmth: 6000
  ),
  StyleVariant(
    id: "obsidian-champagne",
    topColor: CIColor(red: 0.05, green: 0.07, blue: 0.13, alpha: 1.0),
    bottomColor: CIColor(red: 0.11, green: 0.10, blue: 0.09, alpha: 1.0),
    glowTint: CIColor(red: 0.83, green: 0.69, blue: 0.42, alpha: 0.26),
    contrast: 1.08,
    saturation: 1.04,
    warmth: 5800
  ),
]

func savePNG(_ ciImage: CIImage, extent: CGRect, to url: URL, context: CIContext) throws {
  guard let cgImage = context.createCGImage(ciImage, from: extent) else {
    throw NSError(domain: "BMVisionCutout", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to render CGImage"])
  }
  let rep = NSBitmapImageRep(cgImage: cgImage)
  guard let data = rep.representation(using: .png, properties: [:]) else {
    throw NSError(domain: "BMVisionCutout", code: 3, userInfo: [NSLocalizedDescriptionKey: "Failed to encode PNG"])
  }
  try data.write(to: url)
}

func makeForegroundCutout(from sourceImage: CIImage) -> CIImage? {
  let handler = VNImageRequestHandler(ciImage: sourceImage, options: [:])
  let request = VNGenerateForegroundInstanceMaskRequest()
  do {
    try handler.perform([request])
    guard let result = request.results?.first else { return nil }
    let maskBuffer = try result.generateMaskedImage(
      ofInstances: result.allInstances,
      from: handler,
      croppedToInstancesExtent: true
    )
    return CIImage(cvPixelBuffer: maskBuffer)
  } catch {
    return nil
  }
}

func makeGradientBackground(extent: CGRect, top: CIColor, bottom: CIColor) -> CIImage {
  let grad = CIFilter.linearGradient()
  grad.point0 = CGPoint(x: extent.midX, y: extent.maxY)
  grad.point1 = CGPoint(x: extent.midX, y: extent.minY)
  grad.color0 = top
  grad.color1 = bottom
  return (grad.outputImage ?? CIImage(color: bottom)).cropped(to: extent)
}

func applyGrade(_ image: CIImage, variant: StyleVariant) -> CIImage {
  let colorControls = CIFilter.colorControls()
  colorControls.inputImage = image
  colorControls.contrast = variant.contrast
  colorControls.saturation = variant.saturation
  let graded = colorControls.outputImage ?? image

  let temp = CIFilter.temperatureAndTint()
  temp.inputImage = graded
  temp.neutral = CIVector(x: 6500, y: 0)
  temp.targetNeutral = CIVector(x: CGFloat(variant.warmth), y: 0)
  return (temp.outputImage ?? graded).cropped(to: image.extent)
}

func processSingleImage(
  inputPath: String,
  outputDir: String,
  cutoutEnabled: Bool,
  selectedVariants: Set<String>
) throws -> [String] {
  let inputURL = URL(fileURLWithPath: inputPath)
  guard let rawImage = CIImage(contentsOf: inputURL) else {
    throw NSError(domain: "BMVisionCutout", code: 1, userInfo: [NSLocalizedDescriptionKey: "Cannot load image: \(inputPath)"])
  }

  let context = CIContext(options: [.useSoftwareRenderer: false])
  let baseName = inputURL.deletingPathExtension().lastPathComponent
    .replacingOccurrences(of: " ", with: "_")
  let outURL = URL(fileURLWithPath: outputDir, isDirectory: true)
  try FileManager.default.createDirectory(at: outURL, withIntermediateDirectories: true)

  var outputs: [String] = []
  let subjectImage: CIImage
  if cutoutEnabled, let cut = makeForegroundCutout(from: rawImage) {
    subjectImage = cut
    let cutFile = outURL.appendingPathComponent("\(baseName)__cutout.png")
    try savePNG(cut, extent: cut.extent, to: cutFile, context: context)
    outputs.append(cutFile.path)
  } else {
    subjectImage = rawImage
  }

  let canvasSize = CGSize(
    width: max(rawImage.extent.width, 960),
    height: max(rawImage.extent.height, 720)
  )
  let canvasExtent = CGRect(origin: .zero, size: canvasSize)

  for variant in variants {
    if !selectedVariants.isEmpty && !selectedVariants.contains(variant.id) { continue }
    let bg = makeGradientBackground(extent: canvasExtent, top: variant.topColor, bottom: variant.bottomColor)
    let gradedSubject = applyGrade(subjectImage, variant: variant)

    // Fit subject cleanly inside 86% of canvas centered
    let sExt = gradedSubject.extent
    let maxW = canvasSize.width * 0.86
    let maxH = canvasSize.height * 0.86
    let scale = min(maxW / max(sExt.width, 1), maxH / max(sExt.height, 1))
    let tx = (canvasSize.width - sExt.width * scale) * 0.5 - sExt.minX * scale
    let ty = (canvasSize.height - sExt.height * scale) * 0.5 - sExt.minY * scale
    let transformed = gradedSubject
      .transformed(by: CGAffineTransform(translationX: tx, y: ty).scaledBy(x: scale, y: scale))

    let comp = CIFilter.sourceOverCompositing()
    comp.inputImage = transformed
    comp.backgroundImage = bg
    let finalImg = (comp.outputImage ?? bg).cropped(to: canvasExtent)

    let outFile = outURL.appendingPathComponent("\(baseName)__\(variant.id).png")
    try savePNG(finalImg, extent: canvasExtent, to: outFile, context: context)
    outputs.append(outFile.path)
  }

  return outputs
}

let args = CommandLine.arguments
if args.count < 3 {
  fputs("Usage: bm-vision-cutout <inputPath> <outputDir> [--no-cutout] [--variants=a,b]\n", stderr)
  exit(1)
}

let inputPath = args[1]
let outputDir = args[2]
let cutoutEnabled = !args.contains("--no-cutout")
var selectedVariants = Set<String>()
for arg in args.dropFirst(3) {
  if arg.hasPrefix("--variants=") {
    let raw = String(arg.dropFirst("--variants=".count))
    for item in raw.split(separator: ",") {
      selectedVariants.insert(String(item).trimmingCharacters(in: .whitespaces))
    }
  }
}

do {
  let produced = try processSingleImage(
    inputPath: inputPath,
    outputDir: outputDir,
    cutoutEnabled: cutoutEnabled,
    selectedVariants: selectedVariants
  )
  let json = try JSONSerialization.data(withJSONObject: ["ok": true, "outputs": produced])
  print(String(data: json, encoding: .utf8) ?? "{\"ok\":true}")
} catch {
  fputs("{\"ok\":false,\"error\":\"\(error.localizedDescription)\"}\n", stderr)
  exit(1)
}
