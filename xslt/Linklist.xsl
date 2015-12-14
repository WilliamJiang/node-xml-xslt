<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xml:space="default" exclude-result-prefixes="i">
  <xsl:output method="html" encoding="utf-8" indent="yes" omit-xml-declaration="yes" />
  <xsl:param name="domain">webmd.com</xsl:param>
  <xsl:param name="moduletitle"/>
  <xsl:param name="site_id">3</xsl:param>
  <xsl:template match="/">
    <xsl:element name="div">
      <xsl:attribute name="class">healthConditions module</xsl:attribute>
      <xsl:attribute name="id">
        <xsl:value-of select="$moduletitle"/>
      </xsl:attribute>
      <xsl:attribute name="data-metrics-module">
        <xsl:value-of select="$moduletitle"/>
      </xsl:attribute>
      <xsl:element name="div">
        <xsl:attribute name="class">module-header clearfix</xsl:attribute>
        <xsl:element name="h2">
          <xsl:value-of select="//module_data/module_title"/>
        </xsl:element>
        <xsl:element name="form">
          <xsl:attribute name="action">
            <xsl:text disable-output-escaping="yes">http://www.webmd.com/search/search_results/default.aspx</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="method">get</xsl:attribute>
          <xsl:attribute name="name">
            <xsl:text>health-conditions-search-form</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="id">
            <xsl:text>health-conditions-search-form</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="class">
            <xsl:text>searchForm</xsl:text>
          </xsl:attribute>
          <xsl:element name="input">
            <xsl:attribute name="type">text</xsl:attribute>
            <xsl:attribute name="name">query</xsl:attribute>
            <xsl:attribute name="autocomplete">off</xsl:attribute>
            <xsl:attribute name="class">search typeahead-search</xsl:attribute>
            <xsl:attribute name="value"></xsl:attribute>
            <xsl:attribute name="placeholder">Search your health conditions here</xsl:attribute>
          </xsl:element>
          <xsl:element name="a">
            <xsl:attribute name="data-metrics-link">
              <xsl:text>submit</xsl:text>
            </xsl:attribute>              
            <xsl:attribute name="class">searchIcon submit</xsl:attribute>
            <xsl:attribute name="href">
              <xsl:text disable-output-escaping="yes">#</xsl:text>
            </xsl:attribute>
            <xsl:element name="span">
              <xsl:attribute name="class">icon icon-search</xsl:attribute>
              <xsl:text> </xsl:text>
            </xsl:element>
            <xsl:text> </xsl:text>
          </xsl:element>
          <xsl:element name="ul">
            <xsl:attribute name="class">typeahead-output</xsl:attribute>
            <xsl:text> </xsl:text>
          </xsl:element>
        </xsl:element>
        <xsl:element name="script">
          <xsl:text><![CDATA[
require(['search/1/typeahead'],function(typeahead){
  $(function(){
    typeahead.init(']]></xsl:text>
          <xsl:value-of select="$moduletitle"></xsl:value-of>
          <xsl:text><![CDATA[');
  });
});
$('#health-conditions-search-form .searchIcon.submit').on('click', function(e){
	$('#health-conditions-search-form').submit();
	e.preventDefault();
});
]]></xsl:text>
        </xsl:element>
      </xsl:element>
      <xsl:element name="div">
        <xsl:attribute name="class">module-content</xsl:attribute>
        <xsl:element name="ul">
          <xsl:apply-templates select="//module_data/links/link"/>
        </xsl:element>
        <xsl:element name="div">
          <xsl:attribute name="class">seeAll clearfix</xsl:attribute>
          <xsl:element name="a">
            <xsl:attribute name="href">
              <xsl:text><![CDATA[http://www.webmd.com/a-to-z-guides/common-topics/default.htm]]></xsl:text>
            </xsl:attribute>
            <xsl:attribute name="data-metrics-link">
              <xsl:text>all</xsl:text>
            </xsl:attribute>
            <xsl:text>See All Health Conditions</xsl:text>
          </xsl:element>
        </xsl:element>
      </xsl:element>
    </xsl:element>  
  </xsl:template>
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
  <xsl:template name="get-url-href">
    <xsl:param name="object-id"/>
    <xsl:if test="(//referenced_objects/object[@chronic_id=$object-id and @pointer='0']/target[@siteid=$site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id=$object-id and @pointer='1']/target/@friendlyurl)">
      <xsl:choose>
        <xsl:when test="//referenced_objects/object[@chronic_id=$object-id]//@pointer = '1'">
          <xsl:value-of select="//referenced_objects/object[@chronic_id=$object-id][1]/target/@friendlyurl"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>http://</xsl:text>
          <xsl:value-of select="//referenced_objects/object[@chronic_id=$object-id][1]/target[@siteid=$site_id]/@prefix[1]"/>.<xsl:value-of select="$domain"/>
          <xsl:value-of select="//referenced_objects/object[@chronic_id=$object-id][1]/target[@siteid=$site_id]/@friendlyurl[1]"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>



