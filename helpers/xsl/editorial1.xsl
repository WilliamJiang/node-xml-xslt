<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!-- Force the output to be strict XHTML -->
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="utf-8"></xsl:output>
	<xsl:param name="image_server_url">
		<xsl:text>http://img.preview.webmd.com/dtmcms/preview</xsl:text>
	</xsl:param>
	<xsl:param name="moduletitle"></xsl:param>
	<xsl:param name="site_id">3</xsl:param>
	<xsl:param name="subCategory">
		<xsl:value-of select="//wbmd_pb_module_subcategory/@wbmd_storage_val"></xsl:value-of>
	</xsl:param>
	<xsl:param name="items_per_slide">
		<xsl:text>1</xsl:text>
	</xsl:param>
	<xsl:param name="is_gravity">0</xsl:param>
	<xsl:param name="total_items">
		<xsl:value-of select="count(webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link)"></xsl:value-of>
	</xsl:param>
	<xsl:param name="domain">webmd.com</xsl:param>
	
	<xsl:param name="is_autorotate">
		<xsl:choose>
			<xsl:when test="//wbmd_pb_module_label1/@i_chronicle_id = '091e9c5e81122955'">
				<xsl:text>true</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>false</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:param>
	
	<xsl:param name="is_list">
		<xsl:choose>
			<xsl:when test="//wbmd_pb_module_label2/@i_chronicle_id = '091e9c5e81122957'">
				<xsl:text>true</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>false</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:param>
	
	<xsl:param name="is_thumbs">
		<xsl:choose>
			<xsl:when test="//wbmd_pb_module_label2/@i_chronicle_id = '091e9c5e81122956'">
				<xsl:text>true</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>false</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:param>
	
	<xsl:template match="/">
		<xsl:apply-templates select="webmd_rendition/content/wbmd_asset/webmd_module/module_data"></xsl:apply-templates>
	</xsl:template>
	
	<xsl:template match="module_data">
	
		<xsl:element name="div">
			<xsl:attribute name="class">
				<xsl:text>module spotlight</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$moduletitle"></xsl:value-of></xsl:attribute>
			<xsl:attribute name="data-metrics-module"><xsl:value-of select="$moduletitle"></xsl:value-of></xsl:attribute>
			<xsl:if test="module_title != ''">
				<xsl:element name="div">
					<xsl:attribute name="class"><xsl:text>header clearfix</xsl:text></xsl:attribute>
					<xsl:element name="h3">
						<xsl:value-of select="module_title"></xsl:value-of>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:element name="div">
				<xsl:attribute name="class">
					<xsl:choose>
						<!-- create another subcategory -->
						<xsl:when test="$subCategory = '091e9c5e80f2a901'">
							<xsl:text></xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:text>module-content</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<xsl:element name="div">
					<xsl:attribute name="class">
						<xsl:text>slider</xsl:text>
						<xsl:if test="$is_list = 'true' or $is_thumbs = 'true'">	
								<xsl:text> single</xsl:text>
						</xsl:if>
					</xsl:attribute>
					
					<xsl:element name="div">
						<xsl:choose>
							<xsl:when test="$is_list = 'true' or $is_thumbs = 'true' or count(//module_data/links/link) = 1">
								<xsl:attribute name="class"><xsl:text>singleheader</xsl:text></xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="class"><xsl:text>slides</xsl:text></xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
						<!-- create first slide -->
						<xsl:call-template name="CreateSlide">
							<xsl:with-param name="current_slide">
								<xsl:text>1</xsl:text>
							</xsl:with-param>
							<xsl:with-param name="number_of_slides">
								<xsl:value-of select="ceiling($total_items div $items_per_slide)"></xsl:value-of>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:element>
					<xsl:if test="$is_thumbs = 'true'">
						<xsl:call-template name="CreateThumbs"></xsl:call-template>
					</xsl:if>
					<xsl:if test="$is_list = 'true'">
						<xsl:call-template name="CreateList"></xsl:call-template>
					</xsl:if>	
				</xsl:element>
				
			</xsl:element>
		</xsl:element>
		<!-- carousel.init has two arguments, first is the id, second is a JS object which is entered into the description -->
		<xsl:element name="script">
			<xsl:text><![CDATA[
requirejs(['carousel/1/carousel'],function(carousel){]]></xsl:text>
		<xsl:text><![CDATA[
			]]></xsl:text>
		<xsl:text><![CDATA[carousel.init(']]></xsl:text>	
		<xsl:value-of select="$moduletitle"></xsl:value-of>
<xsl:text><![CDATA[']]></xsl:text>
			<xsl:if test="$is_autorotate = 'true'">
				<xsl:text><![CDATA[, {
		autoPlay: {
			enabled: true,
			pauseOnHover: true,
			delay: 5000
		}
	}]]></xsl:text>
			</xsl:if><xsl:text><![CDATA[);
});]]></xsl:text>
<xsl:text><![CDATA[
]]></xsl:text>
	</xsl:element>
		
	</xsl:template>
	
	<!-- Makes the Thumbnail View-->
	<xsl:template name="CreateThumbs">
		<xsl:element name="div">
			<xsl:attribute name="class">
				<xsl:text>thumbs</xsl:text>
			</xsl:attribute>
			<xsl:if test="count(//module_data/links/link) > 1">
				<xsl:element name="ul">
					<xsl:apply-templates select="//module_data/links/link" mode="thumbs"></xsl:apply-templates>
				</xsl:element>
			</xsl:if>
		</xsl:element>
	</xsl:template>
	
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
									<xsl:value-of select="substring-before(child::link_source_icon/@path, '493x335')"></xsl:value-of><xsl:text>79x79</xsl:text><xsl:value-of select="substring-after(child::link_source_icon/@path, '493x335')"></xsl:value-of>
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
						<xsl:attribute name="class"><xsl:text>thumbtext</xsl:text></xsl:attribute>
						<xsl:element name="div">
							<xsl:attribute name="class"><xsl:text>text</xsl:text></xsl:attribute>
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
							<xsl:attribute name="class"><xsl:text>action</xsl:text></xsl:attribute>
							<xsl:value-of select="child::action_text"/>
						</xsl:element>
					</xsl:element>	
				</xsl:element>
				
			</xsl:element>
			
		</xsl:if>
	</xsl:template>
	
	<!-- Makes the List View -->
	<xsl:template name="CreateList">
		<xsl:element name="div">
			<xsl:attribute name="class">
				<xsl:text>list</xsl:text>
			</xsl:attribute>
			<xsl:if test="count(//module_data/links/link) > 1">
				<xsl:element name="ul">				
					<xsl:apply-templates select="//module_data/links/link" mode="links"></xsl:apply-templates>
				</xsl:element>
			</xsl:if>
		</xsl:element>
	</xsl:template>
	
	<!-- A template to populate the links version-->
	<xsl:template match="//module_data/links/link" mode="links">
		<xsl:if test="position() != 1">
			<xsl:element name="li">
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
					<xsl:choose>
						<xsl:when test="contains(child::link_text, ']')">
							<xsl:value-of select="substring-after(child::link_text, ']')"></xsl:value-of>
						</xsl:when>	
						<xsl:otherwise>
							<xsl:value-of select="child::link_text"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:element>
			</xsl:element>
		</xsl:if>
	</xsl:template>
	
	<!-- makes each slide -->
	<xsl:template name="CreateSlide">
		<xsl:param name="current_slide"></xsl:param>
		<xsl:param name="number_of_slides"></xsl:param>

		<xsl:element name="div">
			<xsl:attribute name="class"><xsl:text>slide</xsl:text></xsl:attribute>
			<xsl:element name="ul">
				<xsl:attribute name="class">
					<xsl:text>listHorizontal</xsl:text>
				</xsl:attribute>
				<!-- make first item -->
				<xsl:call-template name="CreateItem">
					<xsl:with-param name="current_item_in_set">
						<xsl:text>1</xsl:text>
					</xsl:with-param>
					<xsl:with-param name="current_item">
						<xsl:value-of select="(($current_slide - 1) * $items_per_slide ) + 1"></xsl:value-of>
					</xsl:with-param>
					<xsl:with-param name="current_slide">
						<xsl:value-of select="$current_slide"></xsl:value-of>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:element>
		</xsl:element>
		<xsl:if test="$is_list = 'false' and $is_thumbs = 'false'">
			<xsl:if test="$current_slide &lt; $number_of_slides">
				<!-- create each additional slide -->
				<xsl:call-template name="CreateSlide">
					<xsl:with-param name="current_slide">
						<xsl:value-of select="$current_slide + 1"></xsl:value-of>
					</xsl:with-param>
					<xsl:with-param name="number_of_slides">
						<xsl:value-of select="$number_of_slides"></xsl:value-of>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:if>
		</xsl:if>			
		
	</xsl:template>
	
	<!-- makes item -->
	<xsl:template name="CreateItem">
		<xsl:param name="current_item_in_set"></xsl:param>
		<xsl:param name="current_item"></xsl:param>
		<xsl:param name="current_slide"></xsl:param>

		<xsl:element name="li">
			<xsl:attribute name="class">
				<xsl:text>thumb</xsl:text>
				<xsl:if test="substring-before(substring-after(/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_text, '['), ']') = 'video'">
					<xsl:text> video</xsl:text>
				</xsl:if>
			</xsl:attribute>
			<xsl:element name="a">
				<xsl:attribute name="class"><xsl:text>block img clearfix</xsl:text></xsl:attribute>
				<xsl:attribute name="data-metrics-link">
					<xsl:value-of select="$current_item"></xsl:value-of>
				</xsl:attribute>
				<xsl:attribute name="href">
					<xsl:call-template name="GetURLRef">
						<xsl:with-param name="ObjectID">
							<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_url/@chronic_id"></xsl:value-of>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:attribute>
				<xsl:call-template name="GetImg">
					<xsl:with-param name="src">
						<xsl:value-of select="$image_server_url"></xsl:value-of>
						<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_source_icon/@path"></xsl:value-of>
						<xsl:text disable-output-escaping="yes">?resize=279:190</xsl:text>
					</xsl:with-param>
					<xsl:with-param name="alt">
						<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_source_icon/@alt"></xsl:value-of>
					</xsl:with-param>
				</xsl:call-template>
			</xsl:element>
			<xsl:if test="$is_list = 'false' and $is_thumbs = 'false' and is_autorotate = 'false'">
			<xsl:if test="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/body_images/body_image[position()=$current_item]">
				<xsl:element name="a">
					<xsl:attribute name="class"><xsl:text>expert clearfix</xsl:text></xsl:attribute>
					<xsl:attribute name="data-metrics-link">
						<xsl:value-of select="$current_item"></xsl:value-of>
					</xsl:attribute>
					<xsl:attribute name="href">
						<xsl:call-template name="GetURLRef">
							<xsl:with-param name="ObjectID">
								<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/body_images/body_image[position()=$current_item]/image_link/@chronic_id"></xsl:value-of>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:attribute>
					<xsl:if test="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/body_images/body_image[position()=$current_item]/source/@path != ''">
						<xsl:call-template name="GetImg">
							<xsl:with-param name="src">
								<xsl:value-of select="$image_server_url"></xsl:value-of>
								<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/body_images/body_image[position()=$current_item]/source/@path"></xsl:value-of>
							</xsl:with-param>
							<xsl:with-param name="alt">
								<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/body_images/body_image[position()=$current_item]/source/@alt"></xsl:value-of>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:if>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>title</xsl:text></xsl:attribute>
						<xsl:value-of select="substring-before(/webmd_rendition/content/wbmd_asset/webmd_module/module_data/body_images/body_image[position()=$current_item]/override_text,'|')"></xsl:value-of>
					</xsl:element>
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>text</xsl:text></xsl:attribute>
						<xsl:value-of select="substring-after(/webmd_rendition/content/wbmd_asset/webmd_module/module_data/body_images/body_image[position()=$current_item]/override_text,'|')"></xsl:value-of>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			</xsl:if>
				<xsl:element name="a">
				<xsl:attribute name="class"><xsl:text>info clearfix</xsl:text></xsl:attribute>
				<xsl:attribute name="data-metrics-link">
					<xsl:value-of select="$current_item"></xsl:value-of>
				</xsl:attribute>
				<xsl:attribute name="href">
					<xsl:call-template name="GetURLRef">
						<xsl:with-param name="ObjectID">
							<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_url/@chronic_id"></xsl:value-of>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:attribute>
				<!-- title -->
				<xsl:if test="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_text != ''">
					<xsl:element name="h4">
						<xsl:choose>
							<xsl:when test="contains(/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_text, ']')">
								<xsl:value-of select="substring-after(/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_text, ']')"></xsl:value-of>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/link_text"></xsl:value-of>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:element>
				</xsl:if>
				<!-- description -->
				<xsl:if test="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/action_text != ''">
					<xsl:element name="div">
						<xsl:attribute name="class"><xsl:text>text</xsl:text></xsl:attribute>
						<xsl:value-of select="/webmd_rendition/content/wbmd_asset/webmd_module/module_data/links/link[position()=$current_item]/action_text"></xsl:value-of>
					</xsl:element>
				</xsl:if>
			</xsl:element>
		</xsl:element>

		<xsl:if test="$current_item_in_set &lt; $items_per_slide and $current_item &lt; $total_items">
			<!-- create each additional item -->
			<xsl:call-template name="CreateItem">
				<xsl:with-param name="current_item_in_set">
					<xsl:value-of select="$current_item_in_set + 1"></xsl:value-of>
				</xsl:with-param>				
				<xsl:with-param name="current_item">
					<xsl:value-of select="$current_item + 1"></xsl:value-of>
				</xsl:with-param>
				<xsl:with-param name="current_slide">
					<xsl:value-of select="$current_slide"></xsl:value-of>
				</xsl:with-param>
			</xsl:call-template>
		</xsl:if>		
	</xsl:template>
	<xsl:template name="GetURLRef">
		<xsl:param name="ObjectID"></xsl:param>
		<xsl:if test="(//referenced_objects/object[@chronic_id=$ObjectID and @pointer='0']/target[@siteid=$site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id=$ObjectID and @pointer='1']/target/@friendlyurl)">
			<xsl:choose>
				<xsl:when test="//referenced_objects/object[@chronic_id=$ObjectID]//@pointer = '1'">
					<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl"></xsl:value-of>
				</xsl:when>
				<xsl:otherwise>http://<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@prefix[1]"></xsl:value-of>.<xsl:value-of select="$domain"></xsl:value-of>
					<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@friendlyurl[1]"></xsl:value-of>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>
	<xsl:template name="GetOnclickVal">
		<xsl:param name="link_type"></xsl:param>
		<xsl:param name="tracking_val"></xsl:param>
		<xsl:text>return sl(this,'</xsl:text>
		<xsl:value-of select="$link_type"></xsl:value-of>
		<xsl:text>','</xsl:text>
		<xsl:value-of select="$tracking_val"></xsl:value-of>
		<xsl:text>');</xsl:text>
	</xsl:template>
	<xsl:template name="GetImg">
		<xsl:param name="src"></xsl:param>
		<xsl:param name="alt"></xsl:param>
		<img src="{$src}" alt="{$alt}"/>
	</xsl:template>
</xsl:stylesheet>
