﻿require 'haml'
require 'pptgallery/conv/pdf'
require 'pptgallery/conv/png'
require 'pptgallery/conv/html'

class UploadedFile
  def initialize(root, home, m)
    @root = root
    @home = home
    @meta = m
    Dir.mkdir(@meta.dirname) if !Dir.exist?(@meta.dirname)
  end

  def convert(ip, tempfile)
    saveUploaded(tempfile)
    MyLogger.log.info "#{ip} : #{@meta.filename} saved."

    PDF.convert(@meta) unless @meta.ext == 'pdf'
    MyLogger.log.info "#{ip} : Complete converting to PDF."

    PNG.convert(@meta)
    MyLogger.log.info "#{ip} : Complete converting to PNG."

    # makeHtml()
    HTML.create(@meta, @home)
    MyLogger.log.info "#{ip} : Complete making HTML."

    createMetaFile()
    MyLogger.log.info "#{ip} : Complete creating .meta."
    MyLogger.log.info "#{ip} : Complete uploading."
  end

  def saveUploaded(uploadedFile)
    File.open(uploadedFilePath, "w") do |f|
      f.write(uploadedFile.read)
    end
  end

  def createMetaFile
    @meta.save()
  end
    def uploadedFilePath
    File.join(@meta.dirname, "#{@meta.filename}.#{@meta.ext}")
  end
end
