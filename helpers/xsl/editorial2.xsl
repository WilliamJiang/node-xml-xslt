<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xml:space="default" exclude-result-prefixes="i">
  <xsl:output method="html" encoding="utf-8" indent="yes" omit-xml-declaration="yes" />
  <xsl:param name="domain">webmd.com</xsl:param>
  <xsl:param name="moduletitle"/>
  <xsl:param name="site_id">3</xsl:param>

  <xsl:param name="is_action_text">
    <xsl:choose>
      <xsl:when test="count(//module_data/links/link[1]/action_text) &gt; 0">
        <xsl:text>true</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>false</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:param>
  
  <xsl:param name="is_link_url">
    <xsl:choose>
      <xsl:when test="count(//module_data/links/link[1]/link_url/@chronic_id) &gt; 0">
        <xsl:text>true</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>false</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:param>
  
  <xsl:param name="link_url_href">
      <xsl:call-template name="get-url-href">
        <xsl:with-param name="ObjectID">
          <xsl:value-of select="//module_data/links/link[1]/link_url/@chronic_id"/>
        </xsl:with-param>
      </xsl:call-template>
  </xsl:param>
  
  <xsl:template match="/">
    <xsl:element name="div">
      <xsl:attribute name="class">
        <xsl:text>convBlog module</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="id">
        <xsl:value-of select="$moduletitle"/>
      </xsl:attribute>
      <xsl:attribute name="data-metrics-module">
        <xsl:value-of select="$moduletitle" />
      </xsl:attribute>
      <xsl:element name="div">
        <xsl:attribute name="class">module-header</xsl:attribute>
        <xsl:element name="h2">Conversations</xsl:element>
      </xsl:element>
      <xsl:element name="div">
        <xsl:attribute name="class">module-content</xsl:attribute>
        <xsl:element name="div">
          <xsl:attribute name="class">subHeading</xsl:attribute>
          <xsl:element name="h4">
            <xsl:value-of select="//module_data/module_title"/>
          </xsl:element>
        </xsl:element>
        <!-- this element is to prevent margin collaps of the above element -->
        <xsl:element name="div">
          <xsl:attribute name="style">
            <xsl:text>overflow: hidden; height: 0px; width: 100%;</xsl:text>
          </xsl:attribute>
          <xsl:text>#160;</xsl:text>
        </xsl:element>
        
        <xsl:element name="div">
          <xsl:attribute name="class">blogImage</xsl:attribute>
          <xsl:element name="a">
            <xsl:attribute name="href">
              <xsl:value-of select="$link_url_href"/>
            </xsl:attribute>
            <xsl:attribute name="data-metrics-link">1</xsl:attribute>
            <xsl:element name="img">
              <xsl:attribute name="src">
                <xsl:text><![CDATA[//img.webmd.com/dtmcms/live]]></xsl:text>
                <xsl:value-of select="//module_data/links/link[1]/link_source_icon/@path" />
                <xsl:text disable-output-escaping="yes">?resize=611px:329px</xsl:text>
              </xsl:attribute>
            </xsl:element>
          </xsl:element>
        </xsl:element>
        
        <xsl:element name="div">
          <xsl:attribute name="class">blogTitle</xsl:attribute>
          <xsl:element name="a">
            <xsl:attribute name="href">
              <xsl:value-of select="$link_url_href"/>
            </xsl:attribute>
            <xsl:attribute name="data-metrics-link">1</xsl:attribute>
            <xsl:value-of select="//module_data/links/link[1]/link_text"/>
          </xsl:element>
        </xsl:element>
        
        <xsl:element name="div">
          <xsl:attribute name="class">blogContent</xsl:attribute>
          <xsl:element name="a">
            <xsl:attribute name="href">
              <xsl:value-of select="$link_url_href"/>
            </xsl:attribute>
            <xsl:attribute name="data-metrics-link">1</xsl:attribute>
            <xsl:value-of select="//module_data/descriptions/description[1]/description_text"/>
          </xsl:element>
        </xsl:element>

        <xsl:if test="$is_link_url = 'true'">
          <xsl:element name="div">
            <xsl:attribute name="class">linksRow</xsl:attribute>
            <xsl:element name="a">
              <xsl:attribute name="href">
                <xsl:value-of select="$link_url_href"/>
              </xsl:attribute>
              <xsl:attribute name="data-metrics-link">1</xsl:attribute>
              <xsl:text>Read Full Post</xsl:text>
            </xsl:element>
            
            <xsl:if test="$is_action_text = 'true'">
              <xsl:element name="span">
                <xsl:attribute name="class">divider</xsl:attribute>
              </xsl:element>
              <xsl:element name="a">
                <xsl:attribute name="href">
                  <xsl:value-of select="$link_url_href"/>
                  <xsl:value-of select="//module_data/links/link[1]/action_text"/>
                </xsl:attribute>
                <xsl:attribute name="data-metrics-link">1cmnt</xsl:attribute>
                <xsl:text>Comments</xsl:text>
              </xsl:element>
            </xsl:if>
          </xsl:element>
        </xsl:if>

        <xsl:element name="div">
          <xsl:attribute name="class">authorRow</xsl:attribute>
          <xsl:element name="a">
            <xsl:attribute name="href">
              <xsl:value-of select="//module_data/descriptions/description[3]/description_text"/>
            </xsl:attribute>
            <xsl:value-of select="//module_data/descriptions/description[2]/description_text"/>
          </xsl:element>
        </xsl:element>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template name="get-url-href">
    <xsl:param name="ObjectID"/>
    <xsl:if test="(//referenced_objects/object[@chronic_id=$ObjectID and @pointer='0']/target[@siteid=$site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id=$ObjectID and @pointer='1']/target/@friendlyurl)">
      <xsl:choose>
        <xsl:when test="//referenced_objects/object[@chronic_id=$ObjectID]//@pointer = '1'">
          <xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl"/>
        </xsl:when>
        <xsl:otherwise>http://<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@prefix[1]"/>.<xsl:value-of select="$domain"/>
          <xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@friendlyurl[1]"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
