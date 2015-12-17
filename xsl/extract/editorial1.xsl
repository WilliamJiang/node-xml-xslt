<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:json="http://json.org/">
    <xsl:import href="xml-to-json.xsl"/>

    <!-- A template to populate the thumbs version -->
    <xsl:template match="//module_data/links/link" mode="thumbs">
        <xsl:if test="position() != 1">
            <xsl:element name="li">
                <xsl:if test="substring-before(substring-after(/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link/link_text, '['), ']') = 'video'">
                    <xsl:attribute name="class">
                        <xsl:text> video</xsl:text>
                    </xsl:attribute>
                </xsl:if>
                <xsl:element name="a">
                    <xsl:attribute name="href">
                        <xsl:call-template name="GetURLRef">
                            <xsl:with-param name="ObjectID">
                                <xsl:value-of select="child::link_url/@chronic_id"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="data-metrics-link">
                        <xsl:value-of select="position()"></xsl:value-of>
                    </xsl:attribute>
                    <xsl:call-template name="GetImg">
                        <xsl:with-param name="src">
                            <xsl:value-of select="$image_server_url"></xsl:value-of>
                            <xsl:choose>
                                <!--Cutting down with 493x335 with image array-->
                                <xsl:when test="contains(child::link_source_icon/@path, '493x335')">
                                    <xsl:value-of
                                            select="substring-before(child::link_source_icon/@path, '493x335')"></xsl:value-of><xsl:text>79x79</xsl:text><xsl:value-of
                                        select="substring-after(child::link_source_icon/@path, '493x335')"></xsl:value-of>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="child::link_source_icon/@path"></xsl:value-of>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:with-param>
                        <xsl:with-param name="alt">
                            <xsl:value-of select="child::link_source_icon/@alt"></xsl:value-of>
                        </xsl:with-param>
                    </xsl:call-template>
                    <xsl:element name="div">
                        <xsl:attribute name="class">
                            <xsl:text>thumbtext</xsl:text>
                        </xsl:attribute>
                        <xsl:element name="div">
                            <xsl:attribute name="class">
                                <xsl:text>text</xsl:text>
                            </xsl:attribute>
                            <xsl:choose>
                                <xsl:when test="contains(child::link_text, ']')">
                                    <xsl:value-of select="substring-after(child::link_text, ']')"></xsl:value-of>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="child::link_text"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </xsl:element>
                        <xsl:element name="div">
                            <xsl:attribute name="class">
                                <xsl:text>action</xsl:text>
                            </xsl:attribute>
                            <xsl:value-of select="child::action_text"/>
                        </xsl:element>
                    </xsl:element>
                </xsl:element>

            </xsl:element>

        </xsl:if>
    </xsl:template>

</xsl:stylesheet>