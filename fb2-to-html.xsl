<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

    <xsl:output omit-xml-declaration="yes" method="html" indent="yes" standalone="yes"/>

    <xsl:template match="/">
        <div class="b-reading-book">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="*">
        <i>
            <xsl:attribute name="class">
                <xsl:value-of select="local-name()"/>
            </xsl:attribute>
            <xsl:for-each select="@*">
                <xsl:attribute name="{local-name()}">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </xsl:for-each>
            <xsl:apply-templates/>
        </i>
    </xsl:template>

</xsl:stylesheet>