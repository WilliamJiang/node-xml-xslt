<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xml:space="default" exclude-result-prefixes="i">
    <xsl:template match="//module_data/links/link">
        <xsl:element name="li">
            <xsl:element name="a">
                <xsl:attribute name="href">
                    <xsl:call-template name="get-url-href">
                        <xsl:with-param name="object-id">
                            <xsl:value-of select="link_link/@chronic_id"/>
                        </xsl:with-param>
                    </xsl:call-template>
                </xsl:attribute>
                <xsl:attribute name="data-metrics-link">
                    <xsl:value-of select="position()"/>
                </xsl:attribute>
                <xsl:value-of select="link_text"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
</xsl:stylesheet>